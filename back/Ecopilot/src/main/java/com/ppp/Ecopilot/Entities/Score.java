package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@ToString
@SuperBuilder
@Entity
public class Score extends BaseEntity<Long> {
    private int annee;
    private int valuer;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "company_owner_id")
    @JsonBackReference
    private CompanyOwner companyOwner;
}