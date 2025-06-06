package com.example.backend.controllers;
import java.util.List;


import org.springframework.core.io.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.example.backend.Services.JwtService;
import com.example.backend.Services.StorageService;
import com.example.backend.models.FileUpload;

import java.nio.file.Files;
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
@GetMapping("/files/{id}/open")
public ResponseEntity<Resource> openFile(@PathVariable Long id) {
    // Recuperar información del archivo desde la base de datos


    try {
        // Obtener la ruta del archivo desde el servicio de almacenamiento
        Path filePath = storageService.getFilePath(id);
        Resource resource = new UrlResource(filePath.toUri());
        String contentType = Files.probeContentType(filePath);
        MediaType mediaType = MediaType.parseMediaType(contentType);
        String filename = resource.getFilename();
        // Verificar si el archivo existe y es legible
        if (!resource.exists() || !resource.isReadable()) {
            return ResponseEntity.notFound().build();
        }

        // Establecer la respuesta con el archivo y el tipo adecuado
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"") // Para abrirlo en el navegador
                .contentType(mediaType)  // Cambia esto dependiendo del tipo de archivo
                .body(resource);  // Aquí enviamos el archivo como cuerpo de la respuesta

    } catch (Exception e) {
        return ResponseEntity.internalServerError().build();  // En caso de error
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
    @CookieValue("token") String token // <-- así lo extraes desde la cookie
) {
    try {
        String username = jwtService.extractUsername(token);
        FileUpload filedata = storageService.uploadFile(username, newFile, topic_id);
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