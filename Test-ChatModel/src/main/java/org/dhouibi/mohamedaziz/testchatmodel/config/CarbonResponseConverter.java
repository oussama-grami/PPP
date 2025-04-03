package org.dhouibi.mohamedaziz.testchatmodel.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.dhouibi.mohamedaziz.testchatmodel.Models.CarbonOutput;
import org.dhouibi.mohamedaziz.testchatmodel.Models.CarbonResponse;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class CarbonResponseConverter {

    private final ObjectMapper objectMapper = new ObjectMapper();

    public CarbonResponse convertResponse(String flaskResponse) throws
            JsonProcessingException {
        // DTO intermédiaire pour la réponse Flask
        FlaskIntermediateResponse intermediate = objectMapper.readValue(flaskResponse, FlaskIntermediateResponse.class);

        return new CarbonResponse(
                intermediate.status,
                parseRecommendations(intermediate.recommendations)
        );
    }

    private CarbonOutput[] parseRecommendations(String recommendationsJson) {
        try {
            // Nettoyage du JSON non formaté
            String cleanJson = recommendationsJson
                    .replace("'", "\"")
                    .replace("\n", "")
                    .replace("\\", "");

            // Conversion en liste d'objets intermédiaires
            List<FlaskRecommendation> intermediateList = Arrays.asList(
                    objectMapper.readValue(cleanJson, FlaskRecommendation[].class)
            );

            // Mapping vers le modèle cible
            return intermediateList.stream()
                    .map(rec -> new CarbonOutput(
                            rec.parameter,
                            rec.objective,
                            rec.interpretation)) // Mapping interpretation -> advice
                    .toArray(CarbonOutput[]::new);

        } catch (JsonProcessingException e) {
            throw new RuntimeException("Erreur de conversion des recommandations", e);
        }
    }

    // Classes internes pour le parsing JSON
    private static class FlaskIntermediateResponse {
        public String status;
        public String recommendations;
    }

    private static class FlaskRecommendation {
        public String parameter;
        public String interpretation;
        public String objective;
    }
}