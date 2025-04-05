package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@ToString
@SuperBuilder
@Entity
public class CarboneFootprintHistory extends BaseEntity<Long> {
    private Date date;
    private boolean predicted;
    private int value;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "companyOwner_id")
    @JsonBackReference
    private CompanyOwner companyOwner;
}