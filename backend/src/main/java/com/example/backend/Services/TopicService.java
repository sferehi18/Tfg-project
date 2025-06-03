package com.example.backend.Services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.backend.DTOs.TopicDTO;
import com.example.backend.Repositories.TopicRepository;
import com.example.backend.Repositories.UserRepository;
import com.example.backend.exceptions.SubjectException;
import com.example.backend.exceptions.TopicException;
import com.example.backend.Repositories.SubjectRepository;


import com.example.backend.models.Topic;
import com.example.backend.models.User;

import com.example.backend.models.Subject;
import com.example.backend.utils.AuthMethods; 
@Service
// Servicio para manejar la lógica de negocio relacionada con los temas (topics)
public class TopicService extends AuthMethods {

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private SubjectRepository subjectRepository;
    
    @Autowired
    private UserRepository userRepository;// Necesario para buscar Subject

   
    private TopicDTO toTopicDTO(Topic topic) {
        return new TopicDTO(topic.getName(),topic.getId() ,topic.getSubject().getId());
    }

    public Topic findTopicById(Long id) throws Exception{
        Long userId = getAuthenticatedUserId(); // Obtener el ID del usuario autenticado
        Topic topic = topicRepository.findByIdAndUserId(id,userId)
                .orElseThrow(() -> new Exception("No existe este registro"));
        return topic;
    }


    public List<TopicDTO> getAllTopics() {
        Long userId = getAuthenticatedUserId();
        List<Topic> topics = topicRepository.findByUserId(userId);
        return topics.stream().map(this::toTopicDTO).collect(Collectors.toList());
    }

    // 🔹 Obtener los temas de una asignatura específica
    public List<TopicDTO> getTopicsBySubject(Long subjectId) {
       Long userId = getAuthenticatedUserId(); // Obtener el ID del usuario autenticado
        List<Topic> topics = topicRepository.findBySubjectIdAndUserId(subjectId,userId);
        return topics.stream().map(this::toTopicDTO).collect(Collectors.toList());
    }

    // 🔹 Crear un tema asociado a un Subject
    public TopicDTO createTopic(String name, Long subjectId) {
        // Inicializa la lista de archivos como null o vacía según tu lógica
        Long userId = getAuthenticatedUserId(); // Obtener el ID del usuario autenticado
        Optional<Subject> subject = subjectRepository.findByIdAndUserId(subjectId,userId);
        if (subject.isEmpty()) {
            throw new SubjectException("No existe este registro", HttpStatus.NOT_FOUND);
        }
        
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        if (topicRepository.existsByNameAndUserId(name, userId)) {
            throw new TopicException("Ya existe un tema con este nombre", HttpStatus.BAD_REQUEST);
            
        }
        Topic topic = new Topic(name, subject.get(),user);
        topicRepository.save(topic);
        return toTopicDTO(topic);
    }

    public TopicDTO editAllTopic(String name, Long id) throws Exception {
        Topic topic= findTopicById(id);
        topic.setName(name);
        topicRepository.save(topic);
        return toTopicDTO(topic);
    }

    public TopicDTO deleteTopic(Long id) throws Exception {
        Topic topic= findTopicById(id);
        
        topicRepository.delete(topic);
        return toTopicDTO(topic);
    }
}
