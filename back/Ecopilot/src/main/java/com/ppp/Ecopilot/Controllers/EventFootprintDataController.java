package com.ppp.Ecopilot.Controllers;

import com.ppp.Ecopilot.DTO.EventFootprintDTO.CreateEventFootprintDataDto;
import com.ppp.Ecopilot.DTO.EventFootprintDTO.EventFootprintDataDto;
import com.ppp.Ecopilot.Services.EventFootprintDataService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/event")
@RequiredArgsConstructor
public class EventFootprintDataController {

    private final EventFootprintDataService eventFootprintDataService;

    @PostMapping
    public void create(@RequestBody CreateEventFootprintDataDto createDto) {
        try {
            System.out.println("controller");
            eventFootprintDataService.create(createDto);
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException("Company owner not found for the given ID");
        } catch (Exception e) {
            System.out.println(e.fillInStackTrace());
            throw new RuntimeException("Unexpected error occurred while creating EventFootprintData");
        }
    }

    @GetMapping
    public List<EventFootprintDataDto> findAllByCompanyOwner() {
        try {
            return eventFootprintDataService.getEventFootprintsByCompanyOwner();
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException("Company owner not found for the given ID");
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error occurred while retrieving EventFootprintData");
        }
    }

    @GetMapping("/{id}")
    public EventFootprintDataDto findById(@PathVariable Long id) {
        try {
            return eventFootprintDataService.getEventFootprintById(id);
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException("EventFootprintData not found for the given ID");
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error occurred while retrieving EventFootprintData");
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        try {
            eventFootprintDataService.deleteById(id);
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException("EventFootprintData not found for the given ID");
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error occurred while deleting EventFootprintData");
        }
    }
}
