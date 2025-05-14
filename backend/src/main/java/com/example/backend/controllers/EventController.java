package com.example.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.backend.Services.EventService;
import com.example.backend.models.Event;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("events")
public class EventController {
    @Autowired
    private EventService eventService;
    // Devuelve todos los eventos
    @GetMapping("/")
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }
    //crea un evento
    @PostMapping("/create")
    public Event createEvent(@RequestBody Event event) {
        return eventService.addEvent(event);
    }
    //Borra un evento por id
    @DeleteMapping("delete/{id}")
    public Event deleteEvent(@PathVariable Long id) {
        return eventService.deleteEvent(id);
    }

}
