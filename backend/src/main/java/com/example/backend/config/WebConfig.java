 package com.example.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

     @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Asegúrate de que esto cubra todas las rutas
                .allowedOrigins("http://localhost:5173") // Asegúrate de que el origen esté permitido
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS","PATCH") // Los métodos permitidos
                .allowedHeaders("*");  // Permitir cualquier encabezado
    }
@Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    // Configura la URL pública /uploads/ para acceder a archivos desde esa carpeta
    registry.addResourceHandler("/uploads/**")  // URL pública
            .addResourceLocations("file:/C:/Users/santi/Downloads/tfg/Tfg-project/backend/uploads/");  // Ruta completa en el sistema
}


}