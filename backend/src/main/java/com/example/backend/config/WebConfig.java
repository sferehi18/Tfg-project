 package com.example.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

     @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Asegúrate de que esto cubra todas las rutas
                .allowedOrigins("http://localhost:3000") // Asegúrate de que el origen esté permitido
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Los métodos permitidos
                .allowedHeaders("*");  // Permitir cualquier encabezado
    }
}