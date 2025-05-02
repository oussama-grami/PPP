package com.ppp.Ecopilot.Mappers;

import com.ppp.Ecopilot.Entities.CarbonFootprintHistory;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CarbonInterpolationMapper {


        public List<Map<String, Object>> toHistoricalData(List<CarbonFootprintHistory> histories) {
            return histories.stream()
                    .map(this::toHistoricalDataMap)
                    .collect(Collectors.toList());
        }


        private Map<String, Object> toHistoricalDataMap(CarbonFootprintHistory history) {
            Map<String, Object> map = new HashMap<>();
            map.put("year", history.getDate().getYear());
            map.put("month", history.getDate().getMonthValue());
            map.put("carbon_footprint_kgCO2", history.getValue());
            return map;
        }
}
