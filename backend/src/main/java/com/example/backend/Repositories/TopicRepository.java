package com.example.backend.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.models.Subject;
import com.example.backend.models.Topic;

public interface TopicRepository extends JpaRepository<Topic, Long> {
    List<Topic> findBySubjectIdAndUserId(Long subjectId,Long userId);
    Optional<Topic> findByIdAndUserId(Long id, Long userId);
}
