package com.example.backend.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.models.User;


@Repository
// Repository para la entidad User, que extiende de JpaRepository para proporcionar métodos CRUD
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    User findById(long id);
    User findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
   
    
    
}
