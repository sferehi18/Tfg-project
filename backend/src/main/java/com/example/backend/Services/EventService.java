package com.example.backend.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.Repositories.EventRepository;
import com.example.backend.Repositories.UserRepository;
import com.example.backend.models.Event;
import com.example.backend.models.User;
import com.example.backend.utils.AuthMethods;

import java.util.List;
@Service
public class EventService extends AuthMethods{
    
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private UserRepository userRepository;

    public List<Event> getEventsByUserId(Long userId) {
        return eventRepository.findByUserId(userId);
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id).orElse(null);
    }
    public List<Event> getAllEvents() {
        Long userId = getAuthenticatedUserId();
        return getEventsByUserId(userId);
    }

    public Event addEvent(Event event) {
        Long userId = getAuthenticatedUserId(); 
        User user = userRepository.findById(userId).orElse(null);
        event.setUser(user);
        return eventRepository.save(event);
    }

    public Event deleteEvent(Long id) {
        Long userId = getAuthenticatedUserId(); 
        Event event = eventRepository.findByIdAndUserId(id,userId);
        if (event != null) {
            eventRepository.delete(event);
        }
        return event;
    }
    public Event updateEvent(Long id, Event eventDetails) {
        Long userId = getAuthenticatedUserId();
        Event event = eventRepository.findByIdAndUserId(id,userId);
        if (event != null) {
            event.setTitle(eventDetails.getTitle());
            
            return eventRepository.save(event);
        }
        return null;
    }


}
