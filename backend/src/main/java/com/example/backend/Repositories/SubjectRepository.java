package com.example.backend.Repositories;



import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.models.Subject;

@Repository
// Repository para la entidad Subject, que extiende de JpaRepository para proporcionar métodos CRUD
public interface SubjectRepository extends JpaRepository<Subject,Long> {
   Optional<Subject> findByIdAndUserId(Long id, Long userId);
   Optional<List<Subject>> findByUserId( Long userId);
   boolean existsByNameAndUserId(String name, Long userId);
}
