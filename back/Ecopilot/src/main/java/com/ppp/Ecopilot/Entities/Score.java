package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@ToString
@SuperBuilder
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Score extends BaseEntity<Long> {
    @Column(nullable = false)
    private int annee;
    @Column(nullable = false)
    private int valuer;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "company_owner_id")
    private CompanyOwner companyOwner;
}