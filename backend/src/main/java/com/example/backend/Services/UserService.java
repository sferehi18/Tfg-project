package com.example.backend.Services;

import org.springframework.stereotype.Service;

import com.example.backend.models.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.backend.Repositories.UserRepository;
@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;
    @Override
    public  User loadUserByUsername(String username){
        
        User userDetails = userRepository.findByUsername(username);
        return userDetails;
    }
    
    public User saveUser(User user){
        User newUser = new User(user.getUsername(), user.getEmail(), encodePassword(user.getPassword()));
        userRepository.save(newUser);
        
        return loadUserByUsername(user.getUsername());
    }
    public UserDetails loadUserByEmail(String email){
        UserDetails userDetails = userRepository.findByEmail(email);
        return userDetails;
    }
    
    private String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }
}
