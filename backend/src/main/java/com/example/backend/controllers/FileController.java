package com.example.backend.controllers;

import java.net.MalformedURLException;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.example.backend.Services.JwtService;
import com.example.backend.Services.StorageService;
import com.example.backend.models.FileUpload;


import java.nio.file.Path;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;


@RestController

public class FileController {

    private final JwtService jwtService;

    @Autowired
    StorageService storageService;

    FileController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @GetMapping("topics/{topic_id}/files/")
    public ResponseEntity<List<FileUpload>> getTopicFilesInfo( @PathVariable Long topic_id){
        
    List<FileUpload> filesdata = storageService.getFilesByTopicId(topic_id);
    if (filesdata.isEmpty()) {
        return ResponseEntity.noContent().build(); // Si no hay datos, devolver 204 No Content
    }
    return ResponseEntity.ok(filesdata); // Si hay datos, devolver 200 OK con el cuerpo

    }
    // TODO: PROBLEMA CON EL FilePath
    @GetMapping("/files/{id}/open")
    public ResponseEntity<Map<String, String>> openFile(@PathVariable Long id) {
        Path filePath = storageService.getFilePath(id); // Obtiene la ruta del archivo por su ID
        FileUpload file = storageService.getFileInfoById(id); // Obtiene el archivo por su ID
    
        try {
            // Asegúrate de que el archivo existe y es accesible
            Resource resource = new UrlResource(filePath.toUri());
    
            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.notFound().build();
            }
    
            // Obtener la URL relativa del archivo (asegurándose de que empiece desde 'uploads')
            String fileUrl = "/uploads/" + file.getName(); // Aquí asumimos que los archivos están accesibles desde /uploads en tu servidor
            
            Map<String, String> response = new HashMap<>();
            response.put("fileUrl", fileUrl); // Regresamos la URL relativa del archivo
    
            return ResponseEntity.ok(response);
    
        } catch (MalformedURLException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    



    @GetMapping("files/")
    public ResponseEntity<List<FileUpload>> getAllFilesInfo(){
        List<FileUpload> filesdata = storageService.getAllFilesInfo();
        if (filesdata.isEmpty()) {
            return ResponseEntity.noContent().build(); // Si no hay datos, devolver 204 No Content
        }
        return ResponseEntity.ok(filesdata); // Si hay datos, devolver 200 OK con el cuerpo
    }

 @PostMapping("topics/{topic_id}/files/upload")
public ResponseEntity<?> uploadFile(
        @RequestParam("file") MultipartFile newFile,
        @PathVariable Long topic_id,
        @RequestHeader("Authorization") String authHeader) {

    try {
        

        // 1. Obtener el token del header
        String token = authHeader.substring(7); // Eliminar "Bearer " del token

        // 3. Extraer el username del token (el subject)
        String username = jwtService.extractUsername(token); // Este método debe extraer el subject del JWT

        // 4. Llamar al servicio de subida, pasándole el username
        FileUpload filedata = storageService.uploadFile( username,newFile, topic_id);

        return ResponseEntity.status(HttpStatus.CREATED).body(filedata);

    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error al subir el archivo: " + e.getMessage());
    }
}


@DeleteMapping("files/{file_id}/delete")
public ResponseEntity<?> deleteFile(@PathVariable Long file_id) {
    try {
        storageService.deleteFile(file_id);
        return ResponseEntity.status(HttpStatus.OK).body("Archivo eliminado correctamente.");
    } catch (Exception e) {
        // Este bloque maneja cualquier otro tipo de error
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar el archivo: " + e.getMessage());
    }

}



}