package com.example.backend.Repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.models.Topic;

public interface TopicRepository extends JpaRepository<Topic, Long> {
    List<Topic> findBySubjectId(Long subjectId);
}
