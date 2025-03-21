package com.example.backend.exceptions;

public class SubjectNotFoundException extends RuntimeException{
    public SubjectNotFoundException(String msg){
        super(msg);
    }
}
