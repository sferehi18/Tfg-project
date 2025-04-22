package com.example.backend.controllers;

import java.net.MalformedURLException;
import java.nio.file.Paths;
import java.util.List;
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

import com.example.backend.Services.StorageService;
import com.example.backend.models.FileUpload;


import java.nio.file.Path;

import org.springframework.web.bind.annotation.PostMapping;



@RestController

public class FileController {

    @Autowired
    StorageService storageService;

    @GetMapping("topics/{topic_id}/files/")
    public ResponseEntity<List<FileUpload>> getTopicFilesInfo( @PathVariable Long topic_id){
    List<FileUpload> filesdata = storageService.getAllFiles(topic_id);
    if (filesdata.isEmpty()) {
        return ResponseEntity.noContent().build(); // Si no hay datos, devolver 204 No Content
    }
    return ResponseEntity.ok(filesdata); // Si hay datos, devolver 200 OK con el cuerpo

    }

    @GetMapping("/files/{id}/open")
public ResponseEntity<Resource> openFile(@PathVariable Long id) {
    Path filePath = storageService.getFilePath(id); // Método que obtiene la ruta del archivo por su ID
    FileUpload file = storageService.getFileInfoById(id); // Método que obtiene el archivo por su ID
    

    try {
        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists() || !resource.isReadable()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getName() + "\"")
            .header(HttpHeaders.CONTENT_TYPE, file.getContentType()) // Usa el tipo correcto (PDF, PNG, etc.)
            .body(resource);

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
public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile newFile, @PathVariable Long topic_id) {
    try {
        FileUpload filedata = storageService.uploadFile(newFile, topic_id);
        return ResponseEntity.status(HttpStatus.CREATED).body(filedata);
    } catch (Exception e) {
        // Este bloque maneja cualquier otro tipo de error
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir el archivo: " + e.getMessage());
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