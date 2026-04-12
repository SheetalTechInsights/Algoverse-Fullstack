package com.algoverse.backend.repository;

import com.algoverse.backend.model.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {

    long countByUserIdAndStatus(Long userId, String status);

    // ✅ ADD THIS
    Optional<UserProgress> findByUserIdAndProblemId(Long userId, Long problemId);
}