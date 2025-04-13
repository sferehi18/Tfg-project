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
    

   @GetMapping("subjects/{subject_id}/topics/")
public ResponseEntity<List<TopicDTO>> getSubjectTopics(@PathVariable Long subject_id) {
    List<TopicDTO> topics = topicService.getTopicsBySubject(subject_id);
    if (topics.isEmpty()) {
        return ResponseEntity.noContent().build(); // Si no hay datos, devolver 204 No Content
    }
    return ResponseEntity.ok(topics); // Si hay datos, devolver 200 OK con el cuerpo
}


    @PostMapping("subjects/{id}/topics/create")
    public ResponseEntity<TopicDTO> createTopic(@RequestBody TopicDTO newTopic, @PathVariable Long id) throws Exception{
        TopicDTO Topic = topicService.createTopic(newTopic.getName(),id);
       return ResponseEntity.status(HttpStatus.CREATED).body(Topic);
    
    }


    @PutMapping("topics/{id}/edit")
    public ResponseEntity<TopicDTO> editAllTopic(@PathVariable(required = true) Long id,@RequestBody TopicDTO newTopic){
      TopicDTO topic = topicService.editAllTopic( newTopic.getName(),id);
      return ResponseEntity.ok(topic);
    }

    @DeleteMapping("topics/{id}/delete") 
    public ResponseEntity<TopicDTO> deleteTopic(@PathVariable(required = true) Long id){
      TopicDTO Topic = topicService.deleteTopic(id);
            return ResponseEntity.ok(Topic);

    }

   /*  @PatchMapping("/{id}")
    public ResponseEntity<SubjectDTO> editSubject(@PathVariable Long id,@RequestBody SubjectDTO newSubject) {
      SubjectDTO subject = subjectService.editSubject(id, newSubject.getName());
      return ResponseEntity.ok(subject);
    } */
}
