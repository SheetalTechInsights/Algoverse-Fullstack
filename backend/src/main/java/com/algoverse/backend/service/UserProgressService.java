package com.algoverse.backend.service;

import com.algoverse.backend.model.UserProgress;
import com.algoverse.backend.repository.UserProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserProgressService {

    @Autowired
    private UserProgressRepository userProgressRepository;

    // ✅ MARK SOLVED / ATTEMPTED
    public void mark(Long userId, Long problemId, String status) {

        UserProgress progress = userProgressRepository
                .findByUserIdAndProblemId(userId, problemId)
                .orElse(new UserProgress());

        progress.setUserId(userId);
        progress.setProblemId(problemId);
        progress.setStatus(status);

        userProgressRepository.save(progress);
    }

    // ✅ GET STATUS (VERY IMPORTANT)
    public String getStatus(Long userId, Long problemId) {

        return userProgressRepository
                .findByUserIdAndProblemId(userId, problemId)
                .map(UserProgress::getStatus)
                .orElse("NOT_STARTED");
    }

    // ✅ COUNT SOLVED
    public long getSolved(Long userId) {
        return userProgressRepository.countByUserIdAndStatus(userId, "SOLVED");
    }

    // ✅ COUNT ATTEMPTED
    public long getAttempted(Long userId) {
        return userProgressRepository.countByUserIdAndStatus(userId, "ATTEMPTED");
    }
}