package com.example.backend.exceptions;

public class TopicNotFoundException extends RuntimeException {
    public TopicNotFoundException(String msg){
        super(msg);
    }
}
