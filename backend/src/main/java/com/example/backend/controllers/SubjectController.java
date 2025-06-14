package com.example.backend.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.example.backend.DTOs.SubjectDTO;
import com.example.backend.Services.StorageService;
import com.example.backend.Services.SubjectService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("subjects")
public class SubjectController {

  @Autowired
  private SubjectService subjectService;

  @Autowired
  private StorageService storageService;

  @GetMapping("/{id}")
  public ResponseEntity<SubjectDTO> getSubjectById(@PathVariable Long id) {

    SubjectDTO subject;
    try {
      subject = subjectService.getSubjectById(id);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    return ResponseEntity.ok(subject);

    // Si la asignatura no se encuentra, retorna 404 Not Found

  }
 
  // Devuelve todas las asignaturas
  @GetMapping("/")
  public ResponseEntity<List<SubjectDTO>> getAllSubjects() {
    List<SubjectDTO> subjects = subjectService.getAllSubjects();
    if (subjects.isEmpty()) {
      return ResponseEntity.noContent().build(); // Si no hay datos, devolver 204 No Content
    }
    return ResponseEntity.ok(subjects); // Si hay datos, devolver 200 OK con el cuerpo
  }

  //Crea una asignatura
  @PostMapping("/create")
  public ResponseEntity<?> createSubject(@RequestBody SubjectDTO newSubject)  {
    try {
       SubjectDTO subject = subjectService.createSubject(newSubject.getName());
      return ResponseEntity.status(HttpStatus.CREATED).body(subject);
    } catch (ResponseStatusException e) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage()); // Si hay un conflicto, devolver 409 Conflict
    }
   
    

  }
  //Edita una asignatura
  @PutMapping("/{id}")
  public ResponseEntity<SubjectDTO> editAllSubject(@PathVariable Long id, @RequestBody SubjectDTO newSubject) {
    SubjectDTO subject;
    try {
      subject = subjectService.editSubject(id, newSubject.getName());
    } catch (Exception e) {

      return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
    return ResponseEntity.ok(subject);
  }
  //Marca una asignatura como favorita
  @PatchMapping("/{id}/favorite")
  public ResponseEntity<SubjectDTO> editIsFav(@PathVariable Long id, @RequestBody Boolean isFav) {
    SubjectDTO subject;
    try {
      subject = subjectService.markSubjectAsFav(id, isFav);
    } catch (Exception e) {

      return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
    return ResponseEntity.ok(subject);
  }
  //Borra una asignatura por id
  @DeleteMapping("/{id}")
  public ResponseEntity<SubjectDTO> deleteSubject(@PathVariable(required = true) Long id) {
    SubjectDTO subject;
    try {
      subject = subjectService.deleteSubject(id);
      storageService.deleteFilesOfSubject(subject.getId());
      if(subject != null) {
      
      }
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    return ResponseEntity.ok(subject);

  }

  /*
   * @PatchMapping("/{id}")
   * public ResponseEntity<SubjectDTO> editSubject(@PathVariable Long
   * id,@RequestBody SubjectDTO newSubject) {
   * SubjectDTO subject = subjectService.editSubject(id, newSubject.getName());
   * return ResponseEntity.ok(subject);
   * }
   */

}
