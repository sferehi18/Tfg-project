package com.example.backend.controllers;

import com.example.backend.DTOs.UserDTO;
import com.example.backend.Services.EmailService;
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

    @Autowired
    private EmailService emailService; // Asegúrate de tener un servicio de email configurado
 
    

   @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody User user, HttpServletResponse response) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
    );
    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    Long userId = userService.loadUserByUsername(userDetails.getUsername()).getId();
    
    String token = jwtService.generateToken(userId, userDetails.getUsername());

    // Construir el header Set-Cookie manualmente con SameSite=None y Secure
    String cookieValue = "token=" + token + "; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=3600";
    response.setHeader("Set-Cookie", cookieValue);

    UserDTO authenticatedUser = userService.getUser(userDetails.getUsername());

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
        String token = jwtService.generateEmailToken(user.getUsername());
        emailService.sendConfirmationEmail(user.getEmail(), "https://mysubdomain.serveo.net/auth/confirmRegistration?token=" + token);
        return ResponseEntity.ok(newUser);
    } catch (Exception e) {
        e.printStackTrace(); // Imprime el error en consola
        return ResponseEntity.status(500).body("Error: " + e.getMessage());
    }
          
        
    }

   @GetMapping("/confirmRegistration")
public ResponseEntity<String> confirmRegistration(@RequestParam String token) {
    try {
        if (!jwtService.isTokenExpired(token)) {
            String username = jwtService.extractUsername(token);
            User user = userService.loadUserByUsername(username);
            if (user != null) {
                user.setEnabled(true); // Habilita al usuario
                userService.enableUser(user.getUsername()); // Guarda los cambios
                return ResponseEntity.ok("Registro confirmado exitosamente. Puedes iniciar sesión ahora.");
            } else {
                return ResponseEntity.status(404).body("Usuario no encontrado.");
            }
        } else {
            return ResponseEntity.status(400).body("El token de confirmación ha expirado.");
        }
    } catch (Exception e) {
        e.printStackTrace(); // Esto imprime el error completo en consola/terminal
        return ResponseEntity.status(500).body("Error interno: " + e.getMessage());
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