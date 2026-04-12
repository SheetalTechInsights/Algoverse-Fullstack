package com.algoverse.backend.service;

import com.algoverse.backend.model.Pattern;
import com.algoverse.backend.repository.PatternRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatternService {

    private final PatternRepository patternRepository;

    public PatternService(PatternRepository patternRepository) {
        this.patternRepository = patternRepository;
    }

    // Get all patterns
    public List<Pattern> getAllPatterns() {
        return patternRepository.findAll();
    }

    // Get pattern by id
    public Pattern getPatternById(Long id) {
        return patternRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pattern not found with id: " + id));
    }

    // Create new pattern
    public Pattern savePattern(Pattern pattern) {
        return patternRepository.save(pattern);
    }

    // Delete pattern (cascade will delete problems automatically)
    public void deletePattern(Long id) {

        Pattern pattern = patternRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pattern not found with id: " + id));

        patternRepository.delete(pattern);
    }
}