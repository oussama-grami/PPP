package com.ppp.Ecopilot.Services;



import com.ppp.Ecopilot.DTO.EsgResultDTO;

import org.springframework.stereotype.Service;


@Service
public interface EsgService {

    EsgResultDTO calculateEsg();


}
