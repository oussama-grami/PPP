package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.ppp.Ecopilot.Services.YearMonthAttributeConverter;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.YearMonth;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@ToString
@SuperBuilder
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")

@Table(
        uniqueConstraints=@UniqueConstraint(
                columnNames = {"date", "companyOwner_id"}
        )
)
public class CarbonFootprintHistory extends BaseEntity<Long> {
    @Convert(converter = YearMonthAttributeConverter.class)
    @Column(nullable = false)
    private YearMonth date;


    @Column(nullable = false)
    private boolean predicted;
    @Column(nullable = false)
    private double value;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "companyOwner_id")
    private CompanyOwner companyOwner;
}