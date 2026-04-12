package com.algoverse.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pattern {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 2000)
    private String theory;

    @OneToMany(
            mappedBy = "pattern",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonManagedReference
    @Builder.Default
    private List<Problem> problems = new ArrayList<>();
}