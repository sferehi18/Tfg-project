package com.example.backend.models;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

import jakarta.persistence.Id;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "events")
// Esta clase representa la tabla "events" en la base de datos
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String start;
    private String end;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @NonNull
    @JsonIgnore
    private User user;
}
