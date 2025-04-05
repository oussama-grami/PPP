package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.ppp.Ecopilot.Enums.Roles;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;

@EqualsAndHashCode(callSuper = true)
@Data()
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class CompanyOwner extends User {
    @Column(nullable = false)
    private int country;
    @Column(nullable = false)
    private String domaine;
    @Column(nullable = false)
    private int numTelephone;
    @Enumerated(EnumType.STRING)
    private Roles role;

    @OneToMany(mappedBy = "companyOwner")
    public ArrayList<CarboneFootprintHistory> carboneFootprintHistory;

    @OneToMany(mappedBy = "companyOwner")
    public ArrayList<Score> scores;

    @OneToMany(mappedBy = "companyOwner")
    public ArrayList<EventFootprintData> eventFootprintData;

    @OneToMany(mappedBy = "companyOwner")
    public ArrayList<CarbonFootprintData> carbonFootprintData;

    @OneToMany(mappedBy = "companyOwner")
    public ArrayList<EsgResponse> esgResponses;

    @OneToMany(mappedBy = "companyOwner")
    public ArrayList<Transaction> transactions;

}