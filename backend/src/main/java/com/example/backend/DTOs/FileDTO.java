package com.example.backend.DTOs;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FileDTO {
    private String name;
    private String contentType;
    private LocalDate created_at;
    private Long size;
    
}
