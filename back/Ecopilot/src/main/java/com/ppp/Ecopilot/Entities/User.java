package com.ppp.Ecopilot.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data()
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "_user")
public abstract class User extends BaseEntity<Long> {
    @Column(nullable = false)
    protected String email;
    @Column(nullable = false)
    protected String nom;
    protected String password;
    public String keycloakId;

}