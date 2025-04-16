package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@ToString
@SuperBuilder
@Entity
@EntityListeners(AuditingEntityListener.class)

@IdClass(EsgResponseId.class)  // Use EsgResponseId as the composite key
public class EsgResponse {

    @Id
    @ManyToOne
    @JoinColumn(name = "company_owner_id")
    private CompanyOwner companyOwner;

    @Id
    @ManyToOne
    @JoinColumn(name = "esg_question_id")
    private EsgQuestion esgQuestion;

    @ManyToOne
    @JoinColumn(name = "esg_option_id")
    private EsgOption esgOption;
    @CreatedDate
    @Column(nullable = false, updatable = false)
    protected LocalDateTime createdDate;

    @LastModifiedDate
    @Column(insertable = false)
    protected LocalDateTime lastModifiedDate;

    @CreatedBy
    @Column(updatable = false, nullable = false)
    protected String createdBy;

    @LastModifiedBy
    @Column(insertable = false)
    protected String lastModifiedBy;
}