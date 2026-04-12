package com.algoverse.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String difficulty;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String approach;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String pseudoCode;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String starterCode;

    @ManyToOne
    @JoinColumn(name = "pattern_id", nullable = false)
    @JsonBackReference
    private Pattern pattern;
}