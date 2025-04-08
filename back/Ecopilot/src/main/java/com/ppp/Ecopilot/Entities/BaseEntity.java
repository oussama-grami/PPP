package com.ppp.Ecopilot.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity<ID> {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    protected ID id;

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
    public ID getId() {
        return id;
    }

}