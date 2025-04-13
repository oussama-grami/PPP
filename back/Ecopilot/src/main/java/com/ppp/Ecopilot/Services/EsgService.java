package com.ppp.Ecopilot.Services;



import com.ppp.Ecopilot.DTO.EsgResponseDTO;
import com.ppp.Ecopilot.DTO.EsgResponsesByCategoryDTO;
import com.ppp.Ecopilot.DTO.EsgResultDTO;
import com.ppp.Ecopilot.Entities.EsgQuestion;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
public interface EsgService {

    EsgResultDTO calculateEsg(Long CompanyId);


}
