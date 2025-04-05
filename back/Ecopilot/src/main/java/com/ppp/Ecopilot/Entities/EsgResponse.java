package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
public class EsgResponse extends BaseEntity<Long> {
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "company_owner_id")
    @JsonBackReference
    private CompanyOwner companyOwner;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "esg_question_id")
    @JsonBackReference
    private EsgQuestion esgQuestion;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "esg_option_id")
    @JsonBackReference
    private EsgOption esgOption;
}