package com.ppp.Ecopilot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@SpringBootApplication
public class EcopilotApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcopilotApplication.class, args);
    }

}