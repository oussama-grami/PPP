package com.ppp.Ecopilot.Controllers;

import com.ppp.Ecopilot.Config.CarbonResponseConverter;
import com.ppp.Ecopilot.Models.CarbonFootprintModelRequest;
import com.ppp.Ecopilot.Models.CarbonResponse;
import com.ppp.Ecopilot.Models.EventData;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


@RestController
@RequestMapping("/api/carbon/ai")
public class CarbonController {

    @Value("${flask.api.url.enterprise}")
    private String flaskApiUrlEnterprise;

    @Value("${flask.api.url.event}")
    private String flaskApiUrlEvent;

    private final CarbonResponseConverter converter;

    private final RestTemplate restTemplate;

    public CarbonController(CarbonResponseConverter converter, RestTemplate restTemplate) {
        this.converter = converter;
        this.restTemplate = restTemplate;
    }


    @PostMapping("/recommendations")
    public ResponseEntity<CarbonResponse> generateRecommendations(@RequestBody CarbonFootprintModelRequest carbonInput) {
        try {
            // Préparer les en-têtes de la requête
            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");

            // Créer l'objet de la requête
            HttpEntity<CarbonFootprintModelRequest> request = new HttpEntity<>(carbonInput,
                    headers);

            // Envoyer la requête POST au service Flask
            ResponseEntity<String> response =
                    restTemplate.postForEntity(flaskApiUrlEnterprise, request,
                            String.class);
            CarbonResponse res = converter.convertResponse(response.getBody());
            // Retourner la réponse formatée
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new CarbonResponse("Erreur lors de la génération des recommandations : " + e.getMessage(), null));
        }
    }

    @PostMapping("/generate-recommendations-event")
    public ResponseEntity<CarbonResponse> generateRecommendationsEvent(@RequestBody EventData carbonInput) {
        try {
            // Préparer les en-têtes de la requête
            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");
            System.out.println("EventData: " + carbonInput.toString());
            // Créer l'objet de la requête
            HttpEntity<EventData> request = new HttpEntity<>(carbonInput, headers);

            // Envoyer la requête POST au service Flask
            ResponseEntity<String> response =
                    restTemplate.postForEntity(flaskApiUrlEvent, request,
                            String.class);
            CarbonResponse res = converter.convertResponse(response.getBody());
            // Retourner la réponse formatée
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new CarbonResponse("Erreur lors de la génération des recommandations : " + e.getMessage(), null));
        }
    }
}