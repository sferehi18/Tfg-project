package com.example.backend.exceptions;

import org.springframework.http.HttpStatus;

public class SubjectException extends RuntimeException {
    private final HttpStatus status;

    public SubjectException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}