package com.example.backend.controllers;

import com.example.backend.DTOs.UserDTO;
import com.example.backend.Services.JwtService;
import com.example.backend.Services.UserService;
import com.example.backend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;
 
    

    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody User user, HttpServletResponse response) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
    );
    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    Long userId = userService.loadUserByUsername(userDetails.getUsername()).getId();
    
    String token = jwtService.generateToken(userId, userDetails.getUsername());

    // Crear cookie HttpOnly
    Cookie cookie = new Cookie("token", token);
    cookie.setHttpOnly(true);
    cookie.setSecure(false); // Solo si usas HTTPS
    cookie.setPath("/");
    cookie.setMaxAge( 3600); // 1 hora
    UserDTO authenticatedUser = userService.getUser(userDetails.getUsername());
    // Agregar cookie a la respuesta
    response.addCookie(cookie);

    return ResponseEntity.ok(authenticatedUser);
}

@PostMapping("/logout")
public ResponseEntity<?> logout(HttpServletResponse response) {
    Cookie cookie = new Cookie("token", "");
    cookie.setPath("/");
    cookie.setHttpOnly(true);
    cookie.setSecure(false); // si usas HTTPS
    cookie.setMaxAge(0); // Eliminar la cookie
    response.addCookie(cookie);
    return ResponseEntity.ok().build();
}

    @PostMapping("/validateToken")
    public ResponseEntity<?> postMethodName(@RequestBody String token) {
    
        
     return jwtService.isTokenExpired(token) ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }
    

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
         try {
        boolean newUser = userService.saveUser(user);
        return ResponseEntity.ok(newUser);
    } catch (Exception e) {
        e.printStackTrace(); // Imprime el error en consola
        return ResponseEntity.status(500).body("Error: " + e.getMessage());
    }
          
        
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validateUser(@RequestBody User user) {
        try {
            User userDetails = userService.validateUser(user.getUsername(),user.getPassword());
            // Verifica si el usuario existe y si la contraseña es correcta
            if (userDetails != null) {
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.status(404).body("Usuaio o contraseña incorrectos");
            }
        } catch (Exception e) {
            e.printStackTrace(); // Imprime el error en consola
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    
  
}