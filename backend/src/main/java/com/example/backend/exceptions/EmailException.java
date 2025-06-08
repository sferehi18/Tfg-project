package com.example.backend.exceptions;

import org.springframework.http.HttpStatus;

public class EmailException extends RuntimeException {
    private final String message;
    private final HttpStatus status;

    public EmailException(String message, HttpStatus status) {
        this.message = message;
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public HttpStatus getStatus() {
        return status;
    }
    
}
