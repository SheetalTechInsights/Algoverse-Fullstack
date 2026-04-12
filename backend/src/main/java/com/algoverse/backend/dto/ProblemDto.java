package com.algoverse.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProblemDto {

    private Long id;
    private String name;
    private String difficulty;
    private String description;
    private String approach;
    private String pseudoCode;
    private String starterCode;
}