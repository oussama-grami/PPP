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

import java.util.List;

@RestController
@RequestMapping("/carbonHistory")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")

public class CarbonHistoryController  {

    private final CarbonFootprintHistoryService carbonHistoryService;

    @GetMapping("/all")
    public CarbonFootprintHistoryDTO[] getAllCarbonHistory() {
        return carbonHistoryService.findByCurrentCompanyOwner();
    }



    @PostMapping("/save")
    public ResponseEntity<String> createCarbonHistory(@RequestBody CreateCarbonFootprintHistoryDTO data) {
        try {
            carbonHistoryService.saveCarbonFootprint(data);
            return ResponseEntity.ok("Carbon footprint history saved successfully.");
        } catch (DataIntegrityViolationException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Duplicate entry: A record with the same YearMonth and CompanyOwner already exists.");
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
