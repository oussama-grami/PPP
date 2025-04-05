package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
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
public class CompanyOwner extends User {
    private int country;
    private String domaine;
    private int numTelephone;
    private String password;
    private String role;
    @OneToMany(mappedBy = "companyOwner")
    @JsonManagedReference
    public ArrayList<CarboneFootprintHistory> carboneFootprintHistory;
    @OneToMany(mappedBy = "companyOwner")
    @JsonManagedReference
    public ArrayList<Score> scores;
    @OneToMany(mappedBy = "companyOwner")
    @JsonManagedReference
    public ArrayList<EventFootprintData> eventFootprintData;
    @OneToMany(mappedBy = "companyOwner")
    @JsonManagedReference
    public ArrayList<CarbonFootprintData> carbonFootprintData;
    @OneToMany(mappedBy = "companyOwner")
    @JsonManagedReference
    public ArrayList<EsgResponse> esgResponses;
    @OneToMany(mappedBy = "companyOwner")
    @JsonManagedReference
    public ArrayList<Transaction> transactions;

}