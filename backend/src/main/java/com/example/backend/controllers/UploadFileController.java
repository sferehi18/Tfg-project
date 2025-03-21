package com.example.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.Services.StorageService;
import com.example.backend.models.FileUpload;
import org.springframework.web.bind.annotation.PostMapping;



@RestController
@RequestMapping("subjects/{subject_id}/topics/{topic_id}/files")
public class UploadFileController {

    @Autowired
    StorageService storageService;

    @GetMapping("/")
    public ResponseEntity<List<FileUpload>> getTopicFilesInfo( @PathVariable Long topic_id){
    List<FileUpload> filesdata = storageService.getAllFiles(topic_id);
    if (filesdata.isEmpty()) {
        return ResponseEntity.noContent().build(); // Si no hay datos, devolver 204 No Content
    }
    return ResponseEntity.ok(filesdata); // Si hay datos, devolver 200 OK con el cuerpo
    

    }

  @PostMapping("/upload")
public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile newFile, @PathVariable Long topic_id) {
    try {
        FileUpload filedata = storageService.uploadFile(newFile, topic_id);
        return ResponseEntity.status(HttpStatus.CREATED).body(filedata);
    } catch (Exception e) {
        // Este bloque maneja cualquier otro tipo de error
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir el archivo: " + e.getMessage());
    }
}


    


    
}
