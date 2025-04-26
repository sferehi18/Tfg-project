package com.example.backend.utils;

import org.springframework.security.core.context.SecurityContextHolder;

import com.example.backend.models.User;

public class AuthMethods {
    public static Long getAuthenticatedUserId() {
    var principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (principal instanceof User user) {
        return user.getId(); // Aquí ya tienes el ID directamente
    }
    throw new RuntimeException("Usuario no autenticado");
}
}
