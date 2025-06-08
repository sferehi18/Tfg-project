package com.example.backend.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.Services.StorageService;

import jakarta.mail.Multipart;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private StorageService storageService;
    
    @PostMapping("upload/avatar")
public ResponseEntity<byte[]> uploadPfp(
        @RequestParam("avatar") MultipartFile avatar) {

    storageService.uploadPfp(avatar);
    storageService.getPfpBytes();
   byte[] image = storageService.getPfpBytes();
    return ResponseEntity.ok()
            .contentType(MediaType.IMAGE_JPEG)
            .body(image); 
}

   
    @GetMapping("avatar")
public ResponseEntity<byte[]> getMyAvatar() {
    byte[] image = storageService.getPfpBytes();
    return ResponseEntity.ok()
            .contentType(MediaType.IMAGE_JPEG) // o IMAGE_PNG según lo que guardes
            .body(image);
}

    

    
}
