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
        // Obtener el encabezado Authorization de la solicitud HTTP
        final String authHeader = request.getHeader("Authorization");
        final String jwt; // Declaramos la variable jwt para almacenar el token JWT
        final String username; // Declaramos la variable username para almacenar el nombre de usuario extraído del JWT

        // Verificar si el encabezado de autorización es nulo o no tiene el prefijo "Bearer "
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response); // Si no es válido, pasa la solicitud al siguiente filtro sin realizar ninguna acción
            return; // Salir del método, ya que no se necesita hacer más comprobaciones
        }

        // Extraer el token JWT del encabezado "Authorization" (el prefijo "Bearer " se elimina)
        jwt = authHeader.substring(7);
        // Extraer el nombre de usuario del token JWT utilizando el JwtService
        username = jwtService.extractUsername(jwt);

        // Verificar si el nombre de usuario no es nulo y si no hay un usuario ya autenticado en el contexto de seguridad
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Cargar los detalles del usuario desde el servicio de usuario usando el nombre de usuario extraído del JWT
            var userDetails = userService.loadUserByUsername(username);
            // Verificar si el token JWT es válido para ese usuario
            if (jwtService.isTokenValid(jwt, userDetails)) {
                // Si el token es válido, crear un nuevo objeto de autenticación con los detalles del usuario
                var authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                // Establecer los detalles de la solicitud para este objeto de autenticación
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                // Establecer el contexto de seguridad con la autenticación recién creada
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        // Pasar la solicitud al siguiente filtro en la cadena de filtros
        filterChain.doFilter(request, response);
    }
}
