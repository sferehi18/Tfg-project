package com.example.backend.Repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.example.backend.models.FileUpload;

public interface FileRepository extends JpaRepository<FileUpload,Long>{
     List<FileUpload> findByTopicId(Long TopicId);
}
