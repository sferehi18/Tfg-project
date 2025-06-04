package com.example.backend.config;

import com.example.backend.Services.JwtService;
import com.example.backend.Services.UserService;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    // Inyección de dependencias para los servicios de JWT y usuario
    private final JwtService jwtService;
    private final UserService userService;

    // Constructor que inicializa los servicios necesarios
    public JwtAuthenticationFilter(JwtService jwtService, UserService userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }

    // Método principal que ejecuta el filtro de autenticación JWT
   @Override
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {

    String jwt = null;
    String username = null;

    // 1. Intentar obtener el token del encabezado Authorization
    final String authHeader = request.getHeader("Authorization");
    if (authHeader != null && authHeader.startsWith("Bearer ")) {
        jwt = authHeader.substring(7);
    } else if (request.getCookies() != null) {
        // 2. Si no hay header, buscar la cookie con el nombre "token"
        for (var cookie : request.getCookies()) {
            if (cookie.getName().equals("token")) {
                jwt = cookie.getValue();
                break;
            }
        }
    }

    // Si no hay JWT, continuar con la cadena de filtros
    if (jwt == null) {
        filterChain.doFilter(request, response);
        return;
    }

    username = jwtService.extractUsername(jwt);

    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        var userDetails = userService.loadUserByUsername(username);
        if (jwtService.isTokenValid(jwt, userDetails) ) {
            var authToken = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
    }

    filterChain.doFilter(request, response);
}

}
