package com.algoverse.backend.repository;

import com.algoverse.backend.model.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProblemRepository extends JpaRepository<Problem, Long> {

    List<Problem> findByPatternId(Long patternId);
}
