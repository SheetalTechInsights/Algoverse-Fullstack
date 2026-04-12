package com.algoverse.backend.auth.service;

import com.algoverse.backend.auth.dto.LoginRequest;
import com.algoverse.backend.auth.dto.SignupRequest;
import com.algoverse.backend.auth.entity.User;
import com.algoverse.backend.auth.repository.UserRepository;
import com.algoverse.backend.auth.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // SIGNUP
    public String signup(SignupRequest request) {

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        return "User registered successfully";
    }

    //LOGIN (MOST IMPORTANT FIX HERE)
    public Map<String, String> login(LoginRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        //  CRITICAL FIX (use USERNAME, not email)
        String token = jwtUtil.generateToken(user.getUsername());

        Map<String, String> response = new HashMap<>();
        response.put("token", token);

        return response;
    }
}