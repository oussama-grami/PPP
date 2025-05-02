package com.ppp.Ecopilot.Controllers;

import com.ppp.Ecopilot.DTO.CarbonFootprintDTO.CarbonFootprintCreateDTO;
import com.ppp.Ecopilot.DTO.CarbonFootprintDTO.CarbonFootprintDataDTO;
import com.ppp.Ecopilot.Entities.CarbonFootprintData;
import com.ppp.Ecopilot.Services.CarbonFootprintDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/carbon")

public class CarbonFootprintDataController {

    private final CarbonFootprintDataService service;

    @PostMapping
    public void create(@RequestBody CarbonFootprintCreateDTO dto) {
        System.out.println("Received DTO: " + dto);
        service.saveData(dto);
    }

    @GetMapping
    public List<CarbonFootprintDataDTO> getAll() {
        return service.findAllData();  // Changed from findAll() to findAllData()
    }

    @GetMapping("/{id}")
    public CarbonFootprintDataDTO getById(@PathVariable Long id) {
        return service.findDataById(id);  // Changed from findById() to findDataById()
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteById(id);  // This can stay as is since it doesn't return a DTO
    }

    // You can add your business endpoints too
    @GetMapping("/owner/{ownerId}")
    public List<CarbonFootprintDataDTO> getByOwnerId(@PathVariable Long ownerId) {
        return service.findByCompanyOwnerId(ownerId);
    }
}