package com.example.backend.Services;


import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.backend.models.User;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    private static final String SECRET_KEY = "unaClaveMuyLargaYSeguraParaFirmarJWT12345678901234567890";

    public String generateToken(Long userId,String username) {
        // Genera un token JWT con el ID de usuario y el nombre de usuario
        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .claim("username", username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hora
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("username", String.class);
    }

    public Long extractUserId(String token) {
        return Long.valueOf(Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject());
    }

    public boolean isTokenValid(String token,UserDetails userDetails) {
        
            if(extractUsername(token).equals(userDetails.getUsername()) ){
                return true;
            }; // Si esto no lanza excepción, es válido
            
       
            return false;
        
    }

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }
}
