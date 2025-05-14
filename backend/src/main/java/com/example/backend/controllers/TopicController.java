package com.example.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.DTOs.TopicDTO;
import com.example.backend.Services.TopicService;
@RestController

public class TopicController {
      @Autowired
    private TopicService topicService;
    
// Devuelve todos los temas de una asignatura
   @GetMapping("subjects/{subject_id}/topics/")
public ResponseEntity<List<TopicDTO>> getSubjectTopics(@PathVariable Long subject_id) {
    List<TopicDTO> topics = topicService.getTopicsBySubject(subject_id);
    if (topics.isEmpty()) {
        return ResponseEntity.noContent().build(); // Si no hay datos, devolver 204 No Content
    }
    return ResponseEntity.ok(topics); // Si hay datos, devolver 200 OK con el cuerpo
}
// Devuelve todos los temas
    @GetMapping("topics/All")
    public ResponseEntity<List<TopicDTO>> getAllTopics() {
        List<TopicDTO> topics = topicService.getAllTopics();
        
        return ResponseEntity.ok(topics); // Si hay datos, devolver 200 OK con el cuerpo
    }

// Crea un tema asociado a una asignatura
    @PostMapping("subjects/{id}/topics/create")
    public ResponseEntity<TopicDTO> createTopic(@RequestBody TopicDTO newTopic, @PathVariable Long id) throws Exception{
        TopicDTO Topic = topicService.createTopic(newTopic.getName(),id);
       return ResponseEntity.status(HttpStatus.CREATED).body(Topic);
    
    }

    // Edita un tema
    @PutMapping("topics/{id}/edit")
    public ResponseEntity<TopicDTO> editAllTopic(@PathVariable(required = true) Long id,@RequestBody TopicDTO newTopic){
      TopicDTO topic = null;
      try {
        topic = topicService.editAllTopic( newTopic.getName(),id);
      } catch (Exception e) {
        
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(topic);
      }
      return ResponseEntity.ok(topic);
    }

    // Borra un tema por id
    @DeleteMapping("topics/{id}/delete") 
    public ResponseEntity<TopicDTO> deleteTopic(@PathVariable(required = true) Long id){
      TopicDTO Topic = null;
      try {
        Topic = topicService.deleteTopic(id);
      } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Topic);
      }
            return ResponseEntity.ok(Topic);

    }

   /*  @PatchMapping("/{id}")
    public ResponseEntity<SubjectDTO> editSubject(@PathVariable Long id,@RequestBody SubjectDTO newSubject) {
      SubjectDTO subject = subjectService.editSubject(id, newSubject.getName());
      return ResponseEntity.ok(subject);
    } */
}
