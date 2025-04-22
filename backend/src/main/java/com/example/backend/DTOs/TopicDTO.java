package com.example.backend.DTOs;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter

public class TopicDTO {
    @NonNull
 private String name;
 @NonNull
 private Long id;
 @NonNull
private Long subject_id;

    
}
