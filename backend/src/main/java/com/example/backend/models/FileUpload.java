package com.example.backend.models;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Files")
@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
public class FileUpload{
    @Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NonNull
    private String name;
    @NonNull
    private String contentType;
    @NonNull
    private LocalDate created_at;
    @NonNull
    private Long size;
    
    @NonNull
    @ManyToOne
    @JoinColumn(name = "topic_id",  nullable = false)
    @JsonIgnore
    Topic topic;
    @NonNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    
    User user;


}
