package com.example.backend.Repositories;
import com.example.backend.models.Event;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
public interface EventRepository extends JpaRepository<Event, Long> {
    // Aquí puedes agregar métodos personalizados si es necesario
    // Por ejemplo, para buscar eventos por título o fecha
    List<Event> findByUserId(Long userId);
    Event findByIdAndUserId(Long id, Long userId);
   
    
}
