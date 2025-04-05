package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@ToString
@SuperBuilder
@Entity
public class EsgQuestion extends BaseEntity<Long> {
    private String text;
    @OneToMany(mappedBy = "esgQuestion")
    @JsonManagedReference
    private ArrayList<EsgOption> esgOptions;

    @OneToMany(mappedBy = "esgQuestion")
    @JsonManagedReference
    private ArrayList<EsgResponse> esgResponses;
}