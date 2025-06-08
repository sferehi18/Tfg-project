package com.example.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class GlobalErrorController extends ResponseEntityExceptionHandler {

    // Manejo de la excepción SubjectNotFoundException
    @ExceptionHandler(SubjectException.class)
    public ResponseEntity<ProblemDetail> handleSubjectException(SubjectException ex) {
    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(ex.getStatus(), ex.getMessage());
    problemDetail.setTitle("Error de Asignatura");
    return ResponseEntity.status(ex.getStatus()).body(problemDetail);
}

    @ExceptionHandler(TopicException.class)
    public ResponseEntity<ProblemDetail> handleTopicNotFound(TopicException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(ex.getStatus(), ex.getMessage());
        problemDetail.setTitle("Error de Tema");
        return ResponseEntity.status(ex.getStatus()).body(problemDetail);
    }
    
    // Manejo de excepciones generales (por si ocurren otros errores)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ProblemDetail> handleGenericException(Exception ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error");
        problemDetail.setTitle("Error Processing Request");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(problemDetail);
    }

    // Si alguna otra excepción no controlada se produce, se puede manejar aquí
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ProblemDetail> handleRuntimeException(RuntimeException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, "Runtime ");
        problemDetail.setTitle("Unexpected Error");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(problemDetail);
    }

    @ExceptionHandler(UsernameException.class)
    public ResponseEntity<ProblemDetail> handleUserException(UsernameException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(ex.getStatus(), ex.getMessage());
        problemDetail.setTitle("username");
        return ResponseEntity.status(ex.getStatus()).body(problemDetail);}

    @ExceptionHandler(EmailException.class)
    public ResponseEntity<ProblemDetail> handleEmailException(EmailException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(ex.getStatus(), ex.getMessage());
        problemDetail.setTitle("email");
        return ResponseEntity.status(ex.getStatus()).body(problemDetail);
    }
}
