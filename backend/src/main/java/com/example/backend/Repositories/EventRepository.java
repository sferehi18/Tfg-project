package com.example.backend.Repositories;
import com.example.backend.models.Event;

import org.springframework.data.jpa.repository.JpaRepository;
public interface EventRepository extends JpaRepository<Event, Long> {
    // Aquí puedes agregar métodos personalizados si es necesario
    // Por ejemplo, para buscar eventos por título o fecha
    
    
}
