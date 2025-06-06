package com.example.backend.Services;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.models.FileUpload;
import com.example.backend.models.Topic;
import com.example.backend.models.User;
import com.example.backend.utils.AuthMethods;

import lombok.Getter;
import lombok.Setter;

import com.example.backend.Repositories.FileRepository;
import com.example.backend.Repositories.TopicRepository;
import com.example.backend.Repositories.UserRepository;
    import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;

// Define esta clase como un servicio de Spring
@Service
public class StorageService extends AuthMethods { // Hereda métodos de autenticación

    // Inyecciones de dependencias para interactuar con la base de datos
    @Autowired
    private FileRepository fileRepository;
    
    @Autowired 
    private TopicRepository topicRepository;

    @Autowired 
    private UserRepository userRepository;





public FileUpload uploadFileToSupabase(String username, MultipartFile multipartFile, Long topic_id) {
    try {
        Long userId = getAuthenticatedUserId();

        String supabaseBucket = "uploads"; // Asegúrate de que este es el nombre del bucket real
        String projectRef = "astxfoxaqlvqejfvpmzd";
        String serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzdHhmb3hhcWx2cWVqZnZwbXpkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTIwMjM4NCwiZXhwIjoyMDY0Nzc4Mzg0fQ.QxhuOJ9gaMnuitVg0OBybcLl4Z9oEInd5LsppOLrRgY";

        String filename = multipartFile.getOriginalFilename();
        String objectPath = userId + "/" + filename;

        String uploadUrl = "https://" + projectRef + ".supabase.co/storage/v1/object/" + supabaseBucket + "/" + objectPath;

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(multipartFile.getContentType()));
        headers.set("Authorization", "Bearer " + serviceRoleKey);

        HttpEntity<byte[]> requestEntity = new HttpEntity<>(multipartFile.getBytes(), headers);

        ResponseEntity<String> response = restTemplate.exchange(uploadUrl, HttpMethod.PUT, requestEntity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            FileUpload file = new FileUpload();
            file.setName(filename);
            file.setContentType(multipartFile.getContentType());
            file.setCreated_at(LocalDate.now());
            file.setSize(multipartFile.getSize());
            file.setFilePath(objectPath);

            Topic topic = topicRepository.findById(topic_id)
                .orElseThrow(() -> new RuntimeException("Topic con ID " + topic_id + " no encontrado"));
            User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User con ID " + userId + " no encontrado"));

            file.setTopic(topic);
            file.setUser(user);

            return fileRepository.save(file);
        } else {
            throw new RuntimeException("Error al subir archivo a Supabase: " + response.getStatusCode() + " - " + response.getBody());
        }
    } catch (IOException e) {
        throw new RuntimeException("Error al leer archivo", e);
    }
}




    // Método para subir un archivo, asociarlo a un tema y guardar info en BD
    @Transactional
    public FileUpload uploadFile(String username, MultipartFile multipartFile, Long topic_id) {
        try {
            Long userId = getAuthenticatedUserId(); // Obtiene ID del usuario logueado

            // Crea el directorio para el usuario si no existe
            String uploadDir = "src\\main\\java\\com\\example\\backend\\uploads\\" + userId;
            Path userFolder = Paths.get(uploadDir);
            if (!Files.exists(userFolder)) {
                Files.createDirectories(userFolder);
            }

            // Guarda el archivo en el sistema de archivos local
            String filename = multipartFile.getOriginalFilename();
            Path targetLocation = userFolder.resolve(filename);
            Files.copy(multipartFile.getInputStream(), targetLocation);

            // Detecta tipo MIME real del archivo
            String realMimeType = Files.probeContentType(targetLocation);

            // Crea y llena el objeto FileUpload con metadata
            FileUpload file = new FileUpload();
            file.setName(filename);
            file.setContentType(realMimeType);
            file.setCreated_at(LocalDate.now());
            file.setSize(multipartFile.getSize());

            // Asocia archivo a un tema (Topic) y al usuario
            Topic topic = topicRepository.findById(topic_id)
                .orElseThrow(() -> new RuntimeException("Topic con ID " + topic_id + " no encontrado"));
            User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User con ID " + userId + " no encontrado"));
            file.setTopic(topic);
            file.setUser(user);

            // Guarda el archivo en la base de datos
            return fileRepository.save(file);

        } catch (IOException e) {
            throw new RuntimeException("Error al subir el archivo", e);
        }
    }

    // Obtiene los archivos del usuario actual según el ID del tema
    public List<FileUpload> getFilesByTopicId(Long topic_id) {
        Long userId = getAuthenticatedUserId();
        return fileRepository.findByTopicIdAndUserId(topic_id, userId);
    }

    // (Nombre confuso) Esto también filtra por topic_id y usuario
    public List<FileUpload> getFileById(Long id) {
        Long userId = getAuthenticatedUserId();
        return fileRepository.findByTopicIdAndUserId(id, userId);
    }

    // Redirige a getFilesByTopicId (puede ser redundante)
    public List<FileUpload> getAllFiles(Long topic_id) {
        return getFilesByTopicId(topic_id);
    }

    // Devuelve todos los archivos del usuario actual
    public List<FileUpload> getAllFilesInfo() {
        Long userId = getAuthenticatedUserId();
        return fileRepository.findByUserId(userId);
    }

    // Busca un archivo específico por su ID (sin verificar usuario)
    public FileUpload getFileInfoById(Long id) {
        return fileRepository.findById(id).orElse(null);
    }

    // Devuelve la ruta física del archivo basado en su ID
    public Path getFilePath(Long id) {
        FileUpload file = getFileInfoById(id);
        if (file == null) return null;

        Long userId = getAuthenticatedUserId();
        return Paths.get("src\\main\\java\\com\\example\\backend\\uploads\\" + userId).resolve(file.getName());
    }

    // Elimina archivo físico y su registro en base de datos
    public void deleteFile(Long id) {
        FileUpload file = fileRepository.findById(id).orElse(null);
        if (file != null) {
            Long userId = getAuthenticatedUserId();
            Path filePath = Paths.get("src\\main\\java\\com\\example\\backend\\uploads\\" + userId).resolve(file.getName());
            try {
                Files.deleteIfExists(filePath); // elimina físicamente el archivo
            } catch (IOException e) {
                throw new RuntimeException("Error al eliminar el archivo", e);
            }
            fileRepository.delete(file); // elimina de la base de datos
        }
    }

    // Elimina todos los archivos de un tema específico del usuario
    public void deleteFileByTopicId(Long topic_id) {
        List<FileUpload> files = getFilesByTopicId(topic_id);
        Long userId = getAuthenticatedUserId();
        for (FileUpload file : files) {
            Path filePath = Paths.get("src\\main\\java\\com\\example\\backend\\uploads\\" + userId).resolve(file.getName());
            try {
                Files.deleteIfExists(filePath);
            } catch (IOException e) {
                throw new RuntimeException("Error al eliminar el archivo", e);
            }
            fileRepository.delete(file);
        }
    }
}
