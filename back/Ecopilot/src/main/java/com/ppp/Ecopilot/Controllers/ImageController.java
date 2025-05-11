package com.ppp.Ecopilot.Controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ppp.Ecopilot.DTO.Project.ProjectInsertDTO;
import com.ppp.Ecopilot.Entities.Project;
import com.ppp.Ecopilot.Services.ProjectOwnerService;
import com.ppp.Ecopilot.Services.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {

    private final ProjectService projectService;
    private final ProjectOwnerService projectOwnerService;
    private final ObjectMapper objectMapper;

    @Value("${file.upload-dir:${user.home}/ecopilot/uploads}")
    private String uploadDir;

    @PostMapping("/upload-project-images")
    public ResponseEntity<Long> uploadProjectImages(
            @RequestParam("bannerImage") MultipartFile bannerImage,
            @RequestParam("mapImage") MultipartFile mapImage,
            @RequestParam(value = "urlImage", required = false) MultipartFile urlImage,
            @RequestParam("projectData") String projectDataJson,
            @RequestParam("projectOwnerId") Long projectOwnerId) {

        try {
            // Create the upload directory if it doesn't exist
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Parse the project data from JSON
            ProjectInsertDTO projectData = objectMapper.readValue(projectDataJson, ProjectInsertDTO.class);

            // Set the project owner ID
            projectData.setProjectOwnerId(projectOwnerId);

            // Generate unique filenames for the images
            String bannerImageFilename = saveImage(bannerImage, "banner");
            String mapImageFilename = saveImage(mapImage, "map");

            // Set the image URLs in the project data
            projectData.setRouting("/api/images/" + bannerImageFilename);
            projectData.setMapUrl("/api/images/" + mapImageFilename);

            // Process the optional URL image if provided
            if (urlImage != null && !urlImage.isEmpty()) {
                String urlImageFilename = saveImage(urlImage, "url");
                projectData.setUrl("/api/images/" + urlImageFilename);
            }

            // Save the project with image URLs
            Project savedProject = projectService.save(projectData);

            return ResponseEntity.ok(savedProject.getId());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("type") String type) {
        try {
            // Validate file type
            if (!file.getContentType().startsWith("image/")) {
                return ResponseEntity.badRequest().body("Only image files are allowed.");
            }

            // Create the uploads directory if it doesn't exist
            String dirPath = uploadDir + File.separator + type;
            File directory = new File(dirPath);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Generate a unique filename to avoid collisions
            String originalFileName = file.getOriginalFilename();
            String fileExtension = originalFileName.substring(originalFileName.lastIndexOf('.'));
            String newFileName = UUID.randomUUID().toString() + fileExtension;

            // Save the file
            Path filePath = Paths.get(dirPath + File.separator + newFileName);
            Files.write(filePath, file.getBytes());

            // Return the path where the file can be accessed
            String fileUrl = "/api/images/" + type + "/" + newFileName;

            Map<String, String> response = new HashMap<>();
            response.put("url", fileUrl);

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload image: " + e.getMessage());
        }
    }

    @GetMapping("/{filename:.+}")
    public ResponseEntity<Resource> serveImage(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(filename);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{type}/{filename:.+}")
    public ResponseEntity<?> getImage(@PathVariable String type, @PathVariable String filename) {
        try {
            // Decode the filename in case it contains URL encoded characters
            String decodedFilename = URLDecoder.decode(filename, StandardCharsets.UTF_8.name());

            // Get the file path
            Path filePath = Paths.get(uploadDir + File.separator + type + File.separator + decodedFilename);

            // Check if file exists
            if (!Files.exists(filePath)) {
                return ResponseEntity.notFound().build();
            }

            // Determine the media type
            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            // Return the file
            byte[] fileContent = Files.readAllBytes(filePath);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(fileContent);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to retrieve image: " + e.getMessage());
        }
    }

    private String saveImage(MultipartFile file, String prefix) throws
            IOException {
        if (file.isEmpty()) {
            throw new IOException("Failed to store empty file");
        }

        // Generate a unique filename with UUID
        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf('.'));
        String newFilename = prefix + "-" + UUID.randomUUID() + fileExtension;

        // Save the file
        Path targetLocation = Paths.get(uploadDir).resolve(newFilename);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        return newFilename;
    }
}