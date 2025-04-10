package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
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
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class CarboneFootprintHistory extends BaseEntity<Long> {
    @Column(nullable = false)
    private Date date;
    @Column(nullable = false)
    private boolean predicted;
    @Column(nullable = false)
    private int value;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "companyOwner_id")
    private CompanyOwner companyOwner;
}