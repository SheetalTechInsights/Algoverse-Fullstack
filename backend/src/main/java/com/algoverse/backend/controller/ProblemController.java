package com.algoverse.backend.controller;

import com.algoverse.backend.model.Problem;
import com.algoverse.backend.service.ProblemService;
import com.algoverse.backend.service.UserProgressService;
import com.algoverse.backend.auth.entity.User;
import com.algoverse.backend.auth.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.*;

@RestController
@RequestMapping("/api/problems")
@CrossOrigin(origins = "http://localhost:5173")
public class ProblemController {

    @Autowired
    private ProblemService problemService;

    @Autowired
    private UserProgressService progressService;

    @Autowired
    private UserRepository userRepository;

    // GET problems + status
    @GetMapping("/pattern/{patternId}")
    public ResponseEntity<List<Map<String, Object>>> getProblemsByPattern(@PathVariable Long patternId) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Problem> problems = problemService.getProblemsByPattern(patternId);

        List<Map<String, Object>> result = new ArrayList<>();

        for (Problem problem : problems) {

            String status = progressService.getStatus(user.getId(), problem.getId());

            Map<String, Object> map = new HashMap<>();
            map.put("id", problem.getId());
            map.put("name", problem.getName());
            map.put("description", problem.getDescription());
            map.put("difficulty", problem.getDifficulty());
            map.put("status", status);

            result.add(map);
        }

        return ResponseEntity.ok(result);
    }

    //  GET single problem
    @GetMapping("/{id}")
    public ResponseEntity<Problem> getProblemById(@PathVariable Long id) {
        Problem problem = problemService.getProblemById(id);
        return ResponseEntity.ok(problem);
    }

    //  MARK SOLVED
    @PostMapping("/{id}/solve")
    public String markSolved(@PathVariable Long id) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName(); //
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        progressService.mark(user.getId(), id, "SOLVED");

        return "Marked as solved";
    }
    //  MARK ATTEMPTED
    @PostMapping("/{id}/attempt")
    public String markAttempted(@PathVariable Long id) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        progressService.mark(user.getId(), id, "ATTEMPTED");

        return "Marked as attempted";
    }

    //  STATS
    @GetMapping("/stats")
    public Map<String, Long> stats() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Map<String, Long> map = new HashMap<>();
        map.put("solved", progressService.getSolved(user.getId()));
        map.put("attempted", progressService.getAttempted(user.getId()));

        return map;
    }
}