package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
public class Transaction extends BaseEntity<Long> {
    private String description;

    @OneToMany(mappedBy = "transaction")
    private List<ChartLine> chartLines;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "companyOwner_id")
    private CompanyOwner companyOwner;
}