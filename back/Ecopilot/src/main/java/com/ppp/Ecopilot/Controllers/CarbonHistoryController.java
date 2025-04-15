package com.ppp.Ecopilot.Controllers;


import com.ppp.Ecopilot.DTO.CarbonFootprintHistoryDTO;
import com.ppp.Ecopilot.DTO.CreateCarbonFootprintHistoryDTO;
import com.ppp.Ecopilot.Entities.CarbonFootprintHistory;
import com.ppp.Ecopilot.Services.CarbonFootprintHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carbonHistory")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200") // Port Angular

public class CarbonHistoryController  {

    private final CarbonFootprintHistoryService carbonHistoryService;

    @GetMapping("/all")
    public CarbonFootprintHistoryDTO[] getAllCarbonHistory() {
        return carbonHistoryService.findByCurrentCompanyOwner();
    }



    @PostMapping("/save")
    public void createCarbonHistory(@RequestBody CreateCarbonFootprintHistoryDTO data) {
        System.out.println("Data: " + data);
        carbonHistoryService.saveCarbonFootprint(data);



    }
    @PostMapping("/saveAll")
    public void createAllCarbonHistory(@RequestBody List<CreateCarbonFootprintHistoryDTO> data) {
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

}
