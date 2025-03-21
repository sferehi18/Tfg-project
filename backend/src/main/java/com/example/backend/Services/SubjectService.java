package com.example.backend.Services;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.exceptions.SubjectNotFoundException;
import com.example.backend.DTOs.SubjectDTO;
import com.example.backend.Repositories.SubjectRepository;
import com.example.backend.models.Subject;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    // Método para convertir un Subject a SubjectDTO
    public SubjectDTO toSubjectDTO(Subject subject) {
        return new SubjectDTO(subject.getName(),subject.getId());
    }

    // Método auxiliar para obtener una asignatura por ID
    private Subject findSubjectById(Long id) throws SubjectNotFoundException {
        return subjectRepository.findById(id)
                .orElseThrow(() -> new SubjectNotFoundException("No se encuentra la asignatura con id " + id));
    }

    // CREATE METHODS
    public SubjectDTO createSubject(String name) throws Exception {
        Subject subject = new Subject(name);
        subjectRepository.save(subject);
        return toSubjectDTO(subject);
    }

   
    // GET METHODS
    public List<SubjectDTO> getAllSubjects() {
        List<Subject> subjects = subjectRepository.findAll();
        return subjects.stream().map(this::toSubjectDTO).collect(Collectors.toList());
    }

    public SubjectDTO getSubjectById(Long id) throws SubjectNotFoundException {
        Subject subject = findSubjectById(id); // Usamos el método auxiliar
        return toSubjectDTO(subject);
    }

    // UPDATE METHODS
    public SubjectDTO editSubject(Long id, String name) throws SubjectNotFoundException {
        Subject subject = findSubjectById(id); // Usamos el método auxiliar
        subject.setName(name);
        subjectRepository.save(subject);
        return toSubjectDTO(subject);
    }

    // DELETE METHODS
    public SubjectDTO deleteSubject(Long id) throws SubjectNotFoundException {
        Subject subject = findSubjectById(id); // Usamos el método auxiliar
        subjectRepository.delete(subject);
        return toSubjectDTO(subject);
    }
}
