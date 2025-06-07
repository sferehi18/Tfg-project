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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



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
        // String token = jwtService.generateEmailToken(user.getId(), user.getUsername());
        // emailService.sendConfirmationEmail(user.getEmail(), "localhost:8080/auth/confirmRegistration?token=" + token);
        return ResponseEntity.ok(newUser);
    } catch (Exception e) {
        e.printStackTrace(); // Imprime el error en consola
        return ResponseEntity.status(500).body("Error: " + e.getMessage());
    }
          
        
    }

    @GetMapping("/confirmRegistration")
    public ResponseEntity<String> confirmRegistration(@PathVariable String token) {
        if (!jwtService.isTokenExpired(token)) {
            String username = jwtService.extractUsername(token);
            User user = userService.loadUserByUsername(username);
            if (user != null) {
                user.setEnabled(true); // Habilita al usuario
                userService.saveUser(user); // Guarda los cambios
                return ResponseEntity.ok("Registro confirmado exitosamente. Puedes iniciar sesión ahora.");
            } else {
                return ResponseEntity.status(404).body("Usuario no encontrado.");
            }
        } else {
            return  ResponseEntity.status(400).body("El token de confirmación ha expirado.");
           
            
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