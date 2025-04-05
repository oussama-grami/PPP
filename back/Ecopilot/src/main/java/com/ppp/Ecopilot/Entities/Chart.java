package com.ppp.Ecopilot.Entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor

@NoArgsConstructor
@ToString
@SuperBuilder
@Entity
public class Chart extends BaseEntity<Long> {
    @OneToMany(mappedBy = "chart")
    @JsonManagedReference
    public ArrayList<ChartLine> chartLines;
}