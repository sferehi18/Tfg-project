package com.example.backend.models;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Topics")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
// Esta clase representa la tabla "Topics" en la base de datos
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String name;
 
    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FileUpload> files;
    @NonNull
    @ManyToOne
    
    @JoinColumn(name = "subject_id", nullable = false) // Evita temas sin asignatura
    @JsonIgnore
    private Subject subject;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @NonNull
    private User user;

   
}
