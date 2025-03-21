package com.example.backend.Repositories;



import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.models.Subject;

public interface SubjectRepository extends JpaRepository<Subject,Long> {
    
}
