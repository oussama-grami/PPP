package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class EsgResponse extends BaseEntity<Long> {
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "company_owner_id")
    private CompanyOwner companyOwner;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "esg_question_id")
    private EsgQuestion esgQuestion;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "esg_option_id")
    private EsgOption esgOption;


}