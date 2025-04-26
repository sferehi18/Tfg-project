package com.example.backend.models;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor

@Table(name = "Subjects")
@Entity
public class Subject {

    @Id
  
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private long id;
    @lombok.NonNull
    private String name;
    @NonNull
    private Boolean isFav;
    @ManyToOne
    @NonNull
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
    
@OneToMany(mappedBy = "subject", cascade = CascadeType.ALL, orphanRemoval = true)
private List<Topic> topics;
   
}
