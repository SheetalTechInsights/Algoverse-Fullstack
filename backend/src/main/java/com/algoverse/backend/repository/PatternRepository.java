package com.algoverse.backend.repository;

import com.algoverse.backend.model.Pattern;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatternRepository extends JpaRepository<Pattern, Long> {
}
