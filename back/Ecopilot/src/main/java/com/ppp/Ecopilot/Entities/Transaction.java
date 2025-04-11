package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
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
    @Column(nullable = true, length = 40)
    private String description;
    @Column()
    private Long totalPrice;
    @NotEmpty(message = "chartLines is required")
    @OneToMany(mappedBy = "transaction",cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<ChartLine> chartLines;
    @ManyToOne()
    @JoinColumn(name = "companyOwner_id")
    @JsonIgnore
    private CompanyOwner companyOwner;
}