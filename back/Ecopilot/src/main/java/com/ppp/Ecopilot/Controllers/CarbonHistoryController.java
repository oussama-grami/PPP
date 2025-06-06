package com.ppp.Ecopilot.Controllers;


import com.ppp.Ecopilot.DTO.CarbonFootprintHistory.CarbonFootprintHistoryDTO;
import com.ppp.Ecopilot.DTO.CarbonFootprintHistory.CreateCarbonFootprintHistoryDTO;
import com.ppp.Ecopilot.DTO.CarbonFootprintHistory.InterpolationRequestDTO;
import com.ppp.Ecopilot.Services.CarbonFootprintHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/carbonHistory")
@RequiredArgsConstructor

public class CarbonHistoryController  {

    private final CarbonFootprintHistoryService carbonHistoryService;

    @GetMapping("/all")
    public CarbonFootprintHistoryDTO[] getAllCarbonHistory() {
        return carbonHistoryService.findByCurrentCompanyOwner();
    }



    @PostMapping("/save")
    public ResponseEntity<Map<String, String>> createCarbonHistory(@RequestBody CreateCarbonFootprintHistoryDTO data) {
        System.out.println("Saving new carbon footprint entry: " + data);

        try {
            carbonHistoryService.saveCarbonFootprint(data);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Carbon footprint history saved successfully.");

            return ResponseEntity.ok(response);

        } catch (DataIntegrityViolationException ex) {
            System.out.println("this is where the error is happening");
            ex.printStackTrace();

            Map<String, String> response = new HashMap<>();
            response.put("error", "Duplicate entry: A record with the same YearMonth and CompanyOwner already exists.");

            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(response);
        }
    }

    @PostMapping("/saveAll")
    public void createAllCarbonHistory(@RequestBody List<CreateCarbonFootprintHistoryDTO> data) {
        System.out.println("Data: " + data);
        System.out.println("here");

        carbonHistoryService.saveAllCarbonFootprint(data);
    }

    @PutMapping("/update/{id}")
    public void updateCarbonHistory(@PathVariable Long id, @RequestBody CarbonFootprintHistoryDTO data) {
        carbonHistoryService.updateCarbonFootprint(id, data);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCarbonHistory(@PathVariable Long id) {
        carbonHistoryService.deleteCarbonFootprint(id);
    }


    @PostMapping("/forecast")
    public CarbonFootprintHistoryDTO[] forecastData() {
        return carbonHistoryService.forecastData();
    }



    @PostMapping("/interpolate")
    public ResponseEntity<Void> interpolate(@RequestBody InterpolationRequestDTO request) {
        try {
            
            List<CreateCarbonFootprintHistoryDTO> results = carbonHistoryService.getInterpolatedData(
                    request.getCompanyOwnerId(),
                    request.getStartDate(),
                    request.getEndDate(),
                    request.getTotalValue()
            );

            carbonHistoryService.saveOrUpdateAll(results, 7L);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
