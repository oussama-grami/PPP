package com.ppp.Ecopilot.Seeder;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ppp.Ecopilot.DTO.EsgQuestionDTO;
import com.ppp.Ecopilot.Entities.EsgOption;
import com.ppp.Ecopilot.Entities.EsgQuestion;
import com.ppp.Ecopilot.Services.EsgQuestionService;
import com.ppp.Ecopilot.Services.Implementations.EsgOptionServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
@AllArgsConstructor
public class DataSeeder {
    private final EsgQuestionService esgQuestionService;
    private final EsgOptionServiceImpl esgOptionService;

    @Bean
    public CommandLineRunner seedData(EsgQuestionService esgQuestionService) {
        return args -> {
            if (esgQuestionService.findAll().isEmpty()) {
                ObjectMapper mapper = new ObjectMapper();

                InputStream inputStream = getClass()
                        .getClassLoader()
                        .getResourceAsStream("questions.json");

                Optional.ofNullable(inputStream).orElseThrow(() -> new RuntimeException("❌ questions.json not found"));

                try {
                    List<EsgQuestionDTO> dtos = mapper.readValue(inputStream, new TypeReference<List<EsgQuestionDTO>>() {});
                    List<EsgQuestion> questions = new ArrayList<>();

                    for (EsgQuestionDTO dto : dtos) {
                        EsgQuestion question = EsgQuestion.builder()
                                .category(dto.getCategory())
                                .text(dto.getText())
                                .build();

                        List<EsgOption> options = new ArrayList<>();
                        for (var optDto : dto.getOptions()) {
                            EsgOption option = EsgOption.builder()
                                    .text(optDto.getText())
                                    .score(optDto.getScore())
                                    .esgQuestion(question)
                                    .build();
                            options.add(option);
                        }

                        question.setEsgOptions(options);
                        questions.add(question);
                    }

                    esgQuestionService.saveAll(questions);
                    System.out.println("✅ ESG data seeded from JSON.");
                } catch (Exception e) {
                    System.err.println("❌ Error occurred while processing JSON file: " + e.getMessage());
                }
            } else {
                System.out.println("ℹ️ ESG data already exists, skipping seeding.");
            }
        };
    }
}