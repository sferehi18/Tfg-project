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
@Table(name = "Users") // Esta clase representa la tabla "Users" en la base de datos
@RequiredArgsConstructor // Crea constructor con los campos @NonNull
@NoArgsConstructor // Constructor vacío requerido por JPA
@Getter @Setter // Genera automáticamente getters y setters
//Esta clase representa a un usuario en el sistema y contiene información como nombre de usuario, correo electrónico y contraseña
public class User implements UserDetails { // Implementa UserDetails para integrarse con Spring Security


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID autoincremental
    private Long id;

    @NonNull
    private String username;

    @NonNull
    @Column(unique = true) // Asegura que el email sea único
    private String email;

    @NonNull
    private String password;

    // Relaciones uno-a-muchos: un usuario puede tener muchos subjects, topics, files, events
    @OneToMany(mappedBy = "user")
    @JsonIgnore // Evita bucles infinitos al serializar a JSON
    private List<Subject> subjects;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Topic> topics;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<FileUpload> files;

    @OneToMany(mappedBy = "user")
    private List<Event> events;

    // Métodos requeridos por Spring Security para la autenticación :
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList(); // Sin roles asignados (puedes personalizar esto)
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Cambia si quieres lógica de expiración de cuenta
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Cambia si tienes bloqueo de cuenta
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Cambia si las credenciales pueden expirar
    }

    @Override
    public boolean isEnabled() {
        return true; // Cambia si el usuario puede estar deshabilitado
    }
}
