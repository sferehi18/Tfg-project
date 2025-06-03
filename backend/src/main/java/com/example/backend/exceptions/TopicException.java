package com.example.backend.exceptions;

import org.springframework.http.HttpStatus;

public class TopicException extends RuntimeException {
    private final HttpStatus status;

    public TopicException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }

    
}