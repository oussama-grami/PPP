package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@ToString
@SuperBuilder
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class EsgQuestion extends BaseEntity<Long> {
    @Column(nullable = false)
    private String text;
    @OneToMany(mappedBy = "esgQuestion")
    private List<EsgOption> esgOptions;

    @OneToMany(mappedBy = "esgQuestion")
    private List<EsgResponse> esgResponses;
}