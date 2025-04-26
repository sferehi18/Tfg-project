package com.example.backend.Services;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.example.backend.exceptions.SubjectNotFoundException;
import com.example.backend.DTOs.SubjectDTO;
import com.example.backend.Repositories.SubjectRepository;
import com.example.backend.Repositories.UserRepository;
import com.example.backend.models.Subject;
import com.example.backend.models.User;
import com.example.backend.utils.AuthMethods; // Asegúrate de importar la clase AuthMethods
@Service
public class SubjectService extends AuthMethods {

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private UserRepository userRepository; // Necesario para buscar User

   
    // Método para convertir un Subject a SubjectDTO
    public SubjectDTO toSubjectDTO(Subject subject) {
        return new SubjectDTO(subject.getName(),subject.getId(),subject.getIsFav());
    }

   

    // Método auxiliar para obtener una asignatura por ID
    private Subject findSubjectById(Long id) throws SubjectNotFoundException {
       Long userId = getAuthenticatedUserId(); // Obtener el ID del usuario autenticado
        return subjectRepository.findByIdAndUserId(id,userId)
                .orElseThrow(() -> new SubjectNotFoundException("No se encuentra la asignatura con id " + id));
    }

    // CREATE METHODS
    public SubjectDTO createSubject(String name) throws Exception {
        Long userId = getAuthenticatedUserId(); 
        Optional<User> user = userRepository.findById(userId);// Obtener el ID del usuario autenticado
        Subject subject = new Subject(name,false,user.get());
        subjectRepository.save(subject);
        return toSubjectDTO(subject);
    }

   
    // GET METHODS
    public List<SubjectDTO> getAllSubjects() {
        Long userId = getAuthenticatedUserId(); // Obtener el ID del usuario autenticado
        Optional <List<Subject>> subjectOptional = subjectRepository.findByUserId(userId);
        if (subjectOptional.isPresent()) {
             return subjectOptional.get().stream().map(this::toSubjectDTO).collect(Collectors.toList());
        } else {
            throw new SubjectNotFoundException("No existen este registro");
        }
        
       
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

    public SubjectDTO markSubjectAsFav(Long id, Boolean fav) throws SubjectNotFoundException {
        Subject subject = findSubjectById(id); // Usamos el método auxiliar
        subject.setIsFav(fav);
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
