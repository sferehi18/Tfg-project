package com.example.backend.Services;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.backend.exceptions.SubjectException;
import com.example.backend.DTOs.SubjectDTO;
import com.example.backend.Repositories.SubjectRepository;
import com.example.backend.Repositories.UserRepository;
import com.example.backend.models.Subject;
import com.example.backend.models.User;
import com.example.backend.utils.AuthMethods; // Asegúrate de importar la clase AuthMethods
@Service
// Servicio para manejar la lógica de negocio relacionada con las asignaturas (subjects)
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
    private Subject findSubjectById(Long id) throws Exception {
       Long userId = getAuthenticatedUserId(); // Obtener el ID del usuario autenticado
        return subjectRepository.findByIdAndUserId(id,userId)
                .orElseThrow(() -> new Exception("No ha sido posible determinar tu identidad "
                        + "o no existe este registro"));
    }

    // CREATE METHODS
    public SubjectDTO createSubject(String name) {
        Long userId = getAuthenticatedUserId(); 
        Optional<User> user = userRepository.findById(userId);// Obtener el ID del usuario autenticado
        
        if (user.isEmpty()) {
           throw new SubjectException( "No ha sido posible determinar tu identidad.", HttpStatus.UNAUTHORIZED);
        }

        if(subjectRepository.existsByNameAndUserId(name, userId)) {
          throw new SubjectException( "La asignatura ya existe",HttpStatus.CONFLICT);
        }else{
             Subject subject = new Subject(name.trim(),false,user.get());
              subjectRepository.save(subject);
               return toSubjectDTO(subject);
        }
      
       
    }

   
    // GET METHODS
    public List<SubjectDTO> getAllSubjects() {
        Long userId = getAuthenticatedUserId(); // Obtener el ID del usuario autenticado
        Optional <List<Subject>> subjectOptional = subjectRepository.findByUserId(userId);
        if (subjectOptional.isPresent()) {
             return subjectOptional.get().stream().map(this::toSubjectDTO).collect(Collectors.toList());
        } else {
            throw new SubjectException("No existen este registro",HttpStatus.NOT_FOUND);
        }
        
       
    }

    public SubjectDTO getSubjectById(Long id) throws Exception {
        Subject subject = findSubjectById(id); // Usamos el método auxiliar
        return toSubjectDTO(subject);
    }

    // UPDATE METHODS
    public SubjectDTO editSubject(Long id, String name) throws Exception {
        Long userId = getAuthenticatedUserId();
        if(subjectRepository.existsByNameAndUserId(name, userId)) {
          throw new SubjectException( "La asignatura ya existe",HttpStatus.CONFLICT);
        }
        Subject subject = findSubjectById(id); // Usamos el método auxiliar
        subject.setName(name.trim());
        subjectRepository.save(subject);
        return toSubjectDTO(subject);
    }

    public SubjectDTO markSubjectAsFav(Long id, Boolean fav) throws Exception {
        Subject subject = findSubjectById(id); // Usamos el método auxiliar
        subject.setIsFav(fav);
        subjectRepository.save(subject);
        return toSubjectDTO(subject);
    }



    // DELETE METHODS
    public SubjectDTO deleteSubject(Long id) throws Exception {

        Subject subject = findSubjectById(id); // Usamos el método auxiliar
        subjectRepository.delete(subject);
        return toSubjectDTO(subject);
    }
}
