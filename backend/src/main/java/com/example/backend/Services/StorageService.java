package com.example.backend.Services;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.models.FileUpload;
import com.example.backend.models.Topic;
import com.example.backend.models.User;
import com.example.backend.utils.AuthMethods;
import com.example.backend.Repositories.FileRepository;
import com.example.backend.Repositories.TopicRepository;
import com.example.backend.Repositories.UserRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;

@Service
public class StorageService extends AuthMethods{

   
    
    @Autowired
    private FileRepository fileRepository;
    
    @Autowired 
    private TopicRepository topicRepository;

    @Autowired UserRepository userRepository;

    @Transactional
    public FileUpload uploadFile(String username, MultipartFile multipartFile, Long topic_id) {
        try {
            Long userId = getAuthenticatedUserId(); // Obtener el ID del usuario autenticado
            // Crear el directorio si no existe
            String uploadDir = "src\\main\\java\\com\\example\\backend\\uploads\\" + userId;
            Path userFolder = Paths.get(uploadDir);
            if (!Files.exists(userFolder)) {
                Files.createDirectories(userFolder);
            }
    
            // Guardamos el archivo en el directorio del usuario
            String filename = multipartFile.getOriginalFilename();
            Path targetLocation = userFolder.resolve(filename);
            Files.copy(multipartFile.getInputStream(), targetLocation);
    
            // Detectamos el tipo MIME real del archivo
            String realMimeType = Files.probeContentType(targetLocation);
    
            // Guardamos los detalles del archivo en la base de datos
            FileUpload file = new FileUpload();
            file.setName(filename);
            file.setContentType(realMimeType);
            file.setCreated_at(LocalDate.now());
            file.setSize(multipartFile.getSize());
    
            Topic topic = topicRepository.findById(topic_id).orElseThrow(() ->
                    new RuntimeException("Topic con ID " + topic_id + " no encontrado"));
            User user = userRepository.findById(userId).orElseThrow(() ->
                    new RuntimeException("User con ID " + userId + " no encontrado"));
            file.setTopic(topic);
            file.setUser(user);
            
    
            return fileRepository.save(file);
    
        } catch (IOException e) {
            throw new RuntimeException("Error al subir el archivo", e);
        }
    }

    public List<FileUpload> getFilesByTopicId(Long topic_id) {
        Long userId = getAuthenticatedUserId(); // Obtener el ID del usuario autenticado
        List<FileUpload> files = fileRepository.findByTopicIdAndUserId(topic_id,userId);
        return files;
    }

    public List<FileUpload> getFileById(Long id) {
        Long userId = getAuthenticatedUserId(); // Obtener el ID del usuario autenticado
        List<FileUpload> files = fileRepository.findByTopicIdAndUserId(id,userId);
        return files;
    }
    
    
    public List<FileUpload> getAllFiles(Long topic_id){
     
        List<FileUpload> files = getFilesByTopicId(topic_id);
    
        return files;
    }

    public List<FileUpload> getAllFilesInfo(){
        Long userId = getAuthenticatedUserId(); // Obtener el ID del usuario autenticado
        List<FileUpload> files = fileRepository.findByUserId(userId);
        return files;
    }
    public FileUpload getFileInfoById(Long id) {
        return fileRepository.findById(id).orElse(null);
    }

    public Path getFilePath(Long id){
        FileUpload file = getFileInfoById(id);
        if (file == null) {
            return null; // O lanzar una excepción si prefieres
        }
        Long userId = getAuthenticatedUserId(); // Obtener el ID del usuario autenticado
        Path filePath = Paths.get("src\\main\\java\\com\\example\\backend\\uploads\\"+userId).resolve(file.getName());
        return filePath;
    }

    public void deleteFile(Long id) {
        FileUpload file = fileRepository.findById(id).orElse(null);
        if (file != null) {
            // Eliminar el archivo físico del sistema de archivos
            Long userId = getAuthenticatedUserId();
            Path filePath = Paths.get("src\\main\\java\\com\\example\\backend\\uploads\\"+userId).resolve(file.getName());
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
        List<FileUpload> files =  getFilesByTopicId(topic_id);
        Long userId = getAuthenticatedUserId();
        for (FileUpload file : files) {
            // Eliminar el archivo físico del sistema de archivos
            Path filePath = Paths.get("src\\main\\java\\com\\example\\backend\\uploads\\"+ userId).resolve(file.getName());
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