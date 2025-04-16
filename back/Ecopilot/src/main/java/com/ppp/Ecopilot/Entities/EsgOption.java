package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@ToString
@SuperBuilder
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
@Getter
@Setter
public class EsgOption extends BaseEntity<Long> {

    @Column(nullable = false)
    private String text;

    @Column(nullable = false)
    private int score;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "esg_question_id")
    private EsgQuestion esgQuestion;



    @OneToMany(mappedBy = "esgOption")
    private List<EsgResponse> esgResponses;





}