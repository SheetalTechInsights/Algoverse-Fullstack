package com.algoverse.backend.controller;

import com.algoverse.backend.model.Pattern;
import com.algoverse.backend.service.PatternService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patterns")
@CrossOrigin(origins = "http://localhost:5173")
public class PatternController {

    private final PatternService patternService;

    public PatternController(PatternService patternService) {
        this.patternService = patternService;
    }

    // GET all patterns
    @GetMapping
    public ResponseEntity<List<Pattern>> getAllPatterns() {
        return ResponseEntity.ok(patternService.getAllPatterns());
    }

    // GET pattern by ID
    @GetMapping("/{id}")
    public ResponseEntity<Pattern> getPatternById(@PathVariable Long id) {
        return ResponseEntity.ok(patternService.getPatternById(id));
    }

    // POST create pattern
    @PostMapping
    public ResponseEntity<Pattern> createPattern(@RequestBody Pattern pattern) {
        return ResponseEntity.ok(patternService.savePattern(pattern));
    }

    // DELETE pattern
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePattern(@PathVariable Long id) {
        patternService.deletePattern(id);
        return ResponseEntity.noContent().build();
    }
}