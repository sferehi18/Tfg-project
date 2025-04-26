package com.example.backend.models;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Users")
@RequiredArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User implements UserDetails{
    @Id
    // Atributos de la clase User
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NonNull
    private String username;
    @NonNull
    @Column(unique = true)
    private String email;
    @NonNull
    private String password;
    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Subject> subjects;
    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Topic> topics;
    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<FileUpload> files;
    @OneToMany(mappedBy = "user")
    private List<Event> events;

     @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Devuelve los roles o permisos del usuario. Por ahora, una lista vacía.
        return Collections.emptyList();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Cambiar según la lógica de tu aplicación
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Cambiar según la lógica de tu aplicación
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Cambiar según la lógica de tu aplicación
    }

    @Override
    public boolean isEnabled() {
        return true; // Cambiar según la lógica de tu aplicación
    }
    
    
}
