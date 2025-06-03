package com.example.backend.Services;

import org.springframework.stereotype.Service;

import com.example.backend.models.User;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.backend.DTOs.UserDTO;
import com.example.backend.Repositories.UserRepository;
@Service
public class UserService implements UserDetailsService  {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;
    @Override
    public  User loadUserByUsername(String username){
        
        User userDetails = userRepository.findByUsername(username);
        return userDetails;
    }

    private UserDTO toUserDTO(User user) {
        return new UserDTO(user.getUsername(), user.getEmail());
    }

    public User validateUser(String username, String rawPassword){
        User user = userRepository.findByUsername(username);
    if (user != null && passwordEncoder.matches(rawPassword, user.getPassword())) {
        return user;
    }
        return null;
    }
    //TODO AÑADIR LOGICA VERFIICACION DE USUARIOS NOMBRES E EMAILS
    public boolean saveUser(User user){
        User newUser = new User(user.getUsername(), user.getEmail(), encodePassword(user.getPassword()));
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

    public UserDTO getUser(){
         User authUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        Optional<User> user = userRepository.findById(authUser.getId());
        if(user.isPresent()){
            return toUserDTO(user.get());

        }else{
            return null;
        }
        
    }
}
