package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.validator.constraints.Length;

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
    @Column(nullable = true, length = 40)
    private String description;
    @Column(nullable = true)
    private String address;
    @Column(nullable = false)
    private String country;
    @Column(nullable = false)
    @Min(value = 1000, message = "Le code postal doit être composé de 4 chiffres.")
    @Max(value = 9999, message = "Le code postal doit être composé de 4 chiffres.")
    private int postalCode = 1000;
    @Column(nullable = false)
    private String city;
    @Column(nullable = false)
    private String province;
    @Column(nullable = false)
    private float totalPrice;
    @Column(nullable = false,length = 8)
    private String phone;
    @NotEmpty(message = "chartLines is required")
    @OneToMany(mappedBy = "transaction",cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<ChartLine> chartLines;
    @ManyToOne()
    @JoinColumn(name = "companyOwner_id")
    @JsonIgnore
    private CompanyOwner companyOwner;
}