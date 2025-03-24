import { useState, useEffect } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import CreationContext from "../context/ModalsMenusContext";

function useSubjects() {
  //Definimos queryClient para poder invalidar las queries, es decir, decir que unos datos ya no estan actualizados y forzar un refetch
  const queryClient = useQueryClient(); 
const {closeModal} =  useContext(CreationContext);
//Obtener Asignaturas
  const getSubjects = () => {
    return axios.get("http://localhost:3000/subjects")
      .then(response => {
        return response.data;
      })
     
  };


  //Crear Asignaturas
  const addSubject = async (subject) => {

    const response = await axios.post("http://localhost:3000/subjects", subject);
    return response.data;
  
};
//Utilizamos useMutation para controlar la promesa devuelta por la mutationFn:addSubject
//onSuccess marca que se hara cuando la mutación de datos tenga exito 
//onError: marcara que se hara en caso de que la mutación de datos falle
const createSubject = useMutation({
  mutationFn: addSubject,
  onSuccess: () => {
    console.log("Asignatura añadida exitosamente");
    

    queryClient.invalidateQueries("subjects");
  },
  onError: (err) => {
    console.error("Error al añadir asignatura:", err.message);
    alert("Error al añadir asignatura");
  },
});
const handleAddSubject = (newSubject) => {
 
  createSubject.mutate(newSubject);
  
  
};

//Borrar asignaturas
const deleteSubject = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/subjects/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la asignatura:", error);
    throw error;
  }
};


  
   return {handleAddSubject,getSubjects,deleteSubject};
   
}

export default useSubjects;
