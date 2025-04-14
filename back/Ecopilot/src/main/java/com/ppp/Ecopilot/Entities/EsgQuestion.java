package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.ppp.Ecopilot.Enums.EsgCategory;
import jakarta.persistence.*;
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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EsgCategory category;

    @OneToMany(mappedBy = "esgQuestion", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EsgOption> esgOptions;

    @OneToMany(mappedBy = "esgQuestion")
    private List<EsgResponse> esgResponses;


}