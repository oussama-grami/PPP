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
        return service.findAllData();
    }

    @GetMapping("/{id}")
    public CarbonFootprintDataDTO getById(@PathVariable Long id) {
        return service.findDataById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteById(id);
    }

    // You can add your business endpoints too
    @GetMapping("/owner")
    public List<CarbonFootprintDataDTO> getByOwnerId() {
        return service.findByCompanyOwnerId();
    }
}