package com.algoverse.backend.service;

import com.algoverse.backend.model.Pattern;
import com.algoverse.backend.model.Problem;
import com.algoverse.backend.repository.PatternRepository;
import com.algoverse.backend.repository.ProblemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProblemService {

    private final ProblemRepository problemRepository;
    private final PatternRepository patternRepository;

    public ProblemService(ProblemRepository problemRepository,
                          PatternRepository patternRepository) {
        this.problemRepository = problemRepository;
        this.patternRepository = patternRepository;
    }

    // Get problems by pattern
    public List<Problem> getProblemsByPattern(Long patternId) {
        return problemRepository.findByPatternId(patternId);
    }

    // Get problem by id
    public Problem getProblemById(Long id) {
        return problemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Problem not found with id: " + id));
    }

    // Save problem under a pattern
    public Problem saveProblem(Long patternId, Problem problem) {

        Pattern pattern = patternRepository.findById(patternId)
                .orElseThrow(() -> new RuntimeException("Pattern not found with id: " + patternId));

        problem.setPattern(pattern);

        return problemRepository.save(problem);
    }

    // Delete problem
    public void deleteProblem(Long id) {

        Problem problem = problemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Problem not found with id: " + id));

        problemRepository.delete(problem);
    }
}