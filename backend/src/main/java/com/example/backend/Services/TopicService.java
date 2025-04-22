package com.example.backend.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.DTOs.TopicDTO;
import com.example.backend.Repositories.TopicRepository;
import com.example.backend.Repositories.SubjectRepository;
import com.example.backend.exceptions.TopicNotFoundException;
import com.example.backend.exceptions.SubjectNotFoundException;
import com.example.backend.models.Topic;
import com.example.backend.models.FileUpload;
import com.example.backend.models.Subject;

@Service
public class TopicService {

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private SubjectRepository subjectRepository; // Necesario para buscar Subject

    private TopicDTO toTopicDTO(Topic topic) {
        return new TopicDTO(topic.getName(),topic.getId() ,topic.getSubject().getId());
    }

    public Topic findTopicById(Long id){
        Topic topic = topicRepository.findById(id)
                .orElseThrow(() -> new TopicNotFoundException("No existe este registro"));
        return topic;
    }


    public List<TopicDTO> getAllTopics() {
        List<Topic> topics = topicRepository.findAll();
        return topics.stream().map(this::toTopicDTO).collect(Collectors.toList());
    }

    // 🔹 Obtener los temas de una asignatura específica
    public List<TopicDTO> getTopicsBySubject(Long subjectId) {
        List<Topic> topics = topicRepository.findBySubjectId(subjectId);
        return topics.stream().map(this::toTopicDTO).collect(Collectors.toList());
    }

    // 🔹 Crear un tema asociado a un Subject
    public TopicDTO createTopic(String name, Long subjectId) {
        // Inicializa la lista de archivos como null o vacía según tu lógica
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new SubjectNotFoundException("No se encontró la asignatura"));
        Topic topic = new Topic(name, subject);
        topicRepository.save(topic);
        return toTopicDTO(topic);
    }

    public TopicDTO editAllTopic(String name, Long id) {
        Topic topic= findTopicById(id);
        topic.setName(name);
        topicRepository.save(topic);
        return toTopicDTO(topic);
    }

    public TopicDTO deleteTopic(Long id) {
        Topic topic= findTopicById(id);
        
        topicRepository.delete(topic);
        return toTopicDTO(topic);
    }
}
