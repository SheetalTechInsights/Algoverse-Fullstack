package com.algoverse.backend.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatternDto {

    private Long id;
    private String title;
    private String theory;

    // Instead of full Problem entity, we return simplified DTO
    private List<ProblemDto> problems;
}
