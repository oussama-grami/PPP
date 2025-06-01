package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.ppp.Ecopilot.Enums.Roles;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

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
    private String companyName;
    @Column(nullable = false)
    private String companyCode;
    @Column(nullable = false)
    private String domaine;
    @Column(nullable = false)
    private double numTelephone;
    @Enumerated(EnumType.STRING)
    private Roles role;

    @OneToMany(mappedBy = "companyOwner")
    public List<CarbonFootprintHistory> carboneFootprintHistory;

    @OneToMany(mappedBy = "companyOwner")
    public List<Score> scores;

    @OneToMany(mappedBy = "companyOwner")
    public List<EventFootprintData> eventFootprintData;

    @OneToMany(mappedBy = "companyOwner")
    public List<CarbonFootprintData> carbonFootprintData;

    @OneToMany(mappedBy = "companyOwner")
    public List<EsgResponse> esgResponses;

    @OneToMany(mappedBy = "companyOwner")
    public List<Transaction> transactions;

}