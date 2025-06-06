package com.example.backend.Services;


import io.jsonwebtoken.*; // Librería JWT para generar y validar tokens
import io.jsonwebtoken.security.Keys;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.LocalDate;
import java.util.Date;

@Service
// Servicio para manejar la generación y validación de JSON Web Tokens (JWT)
public class JwtService {

    // 🔐 Clave secreta para firmar el JWT. Debe ser suficientemente larga para el algoritmo HS256
    private static final String SECRET_KEY = "unaClaveMuyLargaYSeguraParaFirmarJWT12345678901234567890";

    /**
     * Genera un JWT que incluye el ID y el nombre de usuario del usuario autenticado.
     * El token expira en 1 hora.
     */
    public String generateToken(Long userId, String username) {
        return Jwts.builder()
                .setSubject(String.valueOf(userId)) // El ID del usuario como "subject"
                .claim("username", username)        // Campo adicional con el nombre de usuario
                .setIssuedAt(new Date())            // Fecha de creación
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // Expira en 1 hora
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // Firma con clave secreta
                .compact();                          // Genera el token como String
    }

        public String generateEmailToken( String username) {
        return Jwts.builder()
                .setSubject(String.valueOf(username)) // El ID del usuario como "subject"
                .claim("username", username)        // Campo adicional con el nombre de usuario
                .setIssuedAt(new Date())            // Fecha de creación
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // Expira en 1 hora
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // Firma con clave secreta
                .compact();                          // Genera el token como String
    }

    /**
     * Extrae el nombre de usuario desde el token.
     */
    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())     // Clave para verificar la firma
                .build()
                .parseClaimsJws(token)              // Parsea el JWT (lanza excepción si es inválido)
                .getBody()
                .get("username", String.class);     // Extrae el "claim" username
    }

    public Date extracDate(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())     // Clave para verificar la firma
                .build()
                .parseClaimsJws(token)              // Parsea el JWT (lanza excepción si es inválido)
                .getBody().getExpiration();
                 
    }

    /**
     * Extrae el ID del usuario desde el "subject" del token.
     */
    public Long extractUserId(String token) {
        return Long.valueOf(
            Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject()                       // El subject contiene el ID del usuario
        );
    }

    /**
     * Verifica si el token es válido para el usuario dado.
     * Solo compara el username, pero asume que el token es válido si no lanza excepción.
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        return extractUsername(token).equals(userDetails.getUsername()) && !isTokenExpired(token) ;
    }

    public boolean isTokenExpired(String token){
        return extracDate(token).before(new Date());
    }

    /**
     * Genera y devuelve la clave de firma HMAC usando la clave secreta.
     */
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes()); // Genera la clave HMAC a partir del String
    }
}
