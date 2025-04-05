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
public class Transaction extends BaseEntity<Long> {
    private String description;

    @OneToMany(mappedBy = "transaction")
    @JsonManagedReference
    private ArrayList<ChartLine> chartLines;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "companyOwner_id")
    @JsonBackReference
    private CompanyOwner companyOwner;
}