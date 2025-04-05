package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
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
public class EsgOption extends BaseEntity<Long> {
    private String text;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "esg_question_id")
    @JsonBackReference
    private EsgQuestion esgQuestion;

    @OneToMany(mappedBy = "esgOption")
    @JsonManagedReference
    private ArrayList<EsgResponse> esgResponses;

}