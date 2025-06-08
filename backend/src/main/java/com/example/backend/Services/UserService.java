package com.example.backend.Services;

import org.springframework.stereotype.Service;

import com.example.backend.models.User;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.backend.DTOs.UserDTO;
import com.example.backend.Repositories.UserRepository;
import com.example.backend.exceptions.EmailException;
import com.example.backend.exceptions.UsernameException;
@Service
public class UserService implements UserDetailsService  {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;
    @Override
    public  User loadUserByUsername(String username){
        
        Optional<User> userDetails = userRepository.findByUsername(username);
        if (userDetails.isPresent()) {
        return userDetails.get();
    }
        return null;
    }

    private UserDTO toUserDTO(User user) {
        return new UserDTO(user.getId(),user.getUsername(), user.getEmail());
    }

    public User validateUser(String username, String rawPassword){
        Optional<User> user = userRepository.findByUsername(username);
    if (user.isPresent() && passwordEncoder.matches(rawPassword, user.get().getPassword())) {
        return user.get();
    }
        return null;
    }
    
    public boolean saveUser(User user){
        if(userRepository.existsByUsername(user.getUsername())){
           throw new UsernameException("Este nombre de usuario ya está en uso", HttpStatus.CONFLICT);
        }else if(userRepository.existsByEmail(user.getEmail())){
            throw new EmailException("Este email ya fue registrado", HttpStatus.CONFLICT);
        }
        User newUser = new User(user.getUsername(), user.getEmail(), encodePassword(user.getPassword()),user.getEnabled());
        userRepository.save(newUser);
        
        return true;
    }
    public UserDetails loadUserByEmail(String email){
        UserDetails userDetails = userRepository.findByEmail(email);
        return userDetails;
    }
    
    private String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    public UserDTO getUser(String username) {
         
        
        Optional<User> user = userRepository.findByUsername(username);
        if(user.isPresent()){
            return toUserDTO(user.get());

        }else{
            return null;
        }
        
    }
}
