package com.example.backend.Services;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.models.FileUpload;
import com.example.backend.models.Topic;
import com.example.backend.Repositories.FileRepository;
import com.example.backend.Repositories.TopicRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;

@Service
public class StorageService {

   
    
    @Autowired
    private FileRepository fileRepository;
    
    @Autowired 
    private TopicRepository topicRepository;

    @Transactional
    public FileUpload uploadFile(MultipartFile multipartFile,Long topic_id) {
        try {
            // Guardamos el archivo en el directorio configurado
            String filename = multipartFile.getOriginalFilename();
            Path targetLocation = Paths.get("src\\main\\resources\\uploads").resolve(filename);
            Files.copy(multipartFile.getInputStream(), targetLocation);
            String realMimeType = Files.probeContentType(targetLocation);
            // Guardamos los detalles del archivo en la base de datos
            FileUpload file = new FileUpload();
            file.setName(filename);
            file.setContentType(realMimeType);
            file.setCreated_at(LocalDate.now());
            file.setSize(multipartFile.getSize());

            Topic topic =  topicRepository.findById(topic_id).get();
            file.setTopic(topic);

            return fileRepository.save(file); // Guardamos la información del archivo en la base de datos

        } catch (IOException e) {
            throw new RuntimeException("Error al subir el archivo", e);
        }
    }

    public List<FileUpload> getAllFiles(Long topic_id){
     
        List<FileUpload> files = fileRepository.findByTopicId(topic_id);
    
        return files;
    }

    public List<FileUpload> getAllFilesInfo(){
        List<FileUpload> files = fileRepository.findAll();
        return files;
    }
    public FileUpload getFileInfoById(Long id) {
        return fileRepository.findById(id).orElse(null);
    }

    public Path getFilePath(Long id){
        FileUpload file = fileRepository.findById(id).orElse(null);
        if (file == null) {
            return null; // O lanzar una excepción si prefieres
        }
        Path filePath = Paths.get("src\\main\\resources\\uploads").resolve(file.getName());
        return filePath;
    }

    public void deleteFile(Long id) {
        FileUpload file = fileRepository.findById(id).orElse(null);
        if (file != null) {
            // Eliminar el archivo físico del sistema de archivos
            Path filePath = Paths.get("src\\main\\resources\\uploads").resolve(file.getName());
            try {
                Files.deleteIfExists(filePath);
            } catch (IOException e) {
                throw new RuntimeException("Error al eliminar el archivo", e);
            }
            // Eliminar la entrada de la base de datos
            fileRepository.delete(file);
        }
    }
    public void deleteFileByTopicId(Long topic_id) {
        List<FileUpload> files = fileRepository.findByTopicId(topic_id);
        for (FileUpload file : files) {
            // Eliminar el archivo físico del sistema de archivos
            Path filePath = Paths.get("src\\main\\resources\\uploads").resolve(file.getName());
            try {
                Files.deleteIfExists(filePath);
            } catch (IOException e) {
                throw new RuntimeException("Error al eliminar el archivo", e);
            }
            // Eliminar la entrada de la base de datos
            fileRepository.delete(file);
        }
}

   
}