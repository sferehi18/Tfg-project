package com.example.backend.Repositories;



import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.models.Subject;

public interface SubjectRepository extends JpaRepository<Subject,Long> {
   Optional<Subject> findByIdAndUserId(Long id, Long userId);
   Optional<List<Subject>> findByUserId( Long userId);
}
