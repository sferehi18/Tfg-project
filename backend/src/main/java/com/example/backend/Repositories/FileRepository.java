package com.example.backend.Repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.models.FileUpload;

@Repository
// Repository para la entidad FileUpload, que extiende de JpaRepository para proporcionar métodos CRUD
public interface FileRepository extends JpaRepository<FileUpload,Long>{
     List<FileUpload> findByTopicIdAndUserId(Long TopicId, Long userId);
     FileUpload findByIdAndUserId(Long TopicId, Long userId);
     List<FileUpload> findByUserId(Long TopicId);
}
