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
@ToString
@SuperBuilder
@NoArgsConstructor
@Entity
public class ChartLine extends BaseEntity<Long> {
    private int quantity;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "chart_id")
    @JsonBackReference
    private Chart chart;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "transaction_id")
    @JsonBackReference
    private Transaction transaction;

    @OneToMany(mappedBy = "chartLine")
    @JsonManagedReference
    private ArrayList<Project> projects;
}