package com.algoverse.backend.auth.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // Strong secret key (min 32 chars)
    private final String SECRET = "mysecretkeymysecretkeymysecretkey";

    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    //  Generate Token
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hrs
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    //  Extract Username
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    //  Extract Expiration
    public Date extractExpiration(String token) {
        return extractAllClaims(token).getExpiration();
    }

    // Extract All Claims
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Check if token expired
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    //  Validate Token (IMPROVED)
    public boolean validateToken(String token, String username) {
        final String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(username) && !isTokenExpired(token));
    }
}