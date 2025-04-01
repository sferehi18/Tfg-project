import { useState, useEffect } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import CreationContext from "../context/ModalsMenusContext";

export function useSubjects() {
  //Definimos queryClient para poder invalidar las queries, es decir, decir que unos datos ya no estan actualizados y forzar un refetch
  const queryClient = useQueryClient(); 

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
 
    const response = await axios.delete(`http://localhost:3000/subjects/${id}`);
    
    return response;
  
};

const subjectDelete = useMutation({
  mutationFn: deleteSubject,
  onSuccess: () =>{
    queryClient.invalidateQueries("subjects");
    console.log("Se ha borrado la asignatura correctamente");
  },
  onError: ()=> {
    console.log("Error al borrar asignatura");
  }
})

const handleDeleteSubject = (id) => {
  subjectDelete.mutate(id);
}


//Editar Asignatura
const editSubject = async ({ id, newValues }) =>{
  console.log("Editando asignatura con ID:", id, "y nuevos valores:", newValues);
  const response = await axios.put(`http://localhost:3000/subjects/${id}`,newValues);
  return response.data;

};


const subjectEdit  = useMutation({
  mutationFn:editSubject,
  onSuccess: () => {
    console.log("Asignatura editada correctamente");
    queryClient.invalidateQueries("subjects");
  },
  onError: () =>{
    console.log("Error al editar Asignatura");
     // Verifica que el ID sea válido
  }
});

const handleEditSubject = ({ id, newValues }) => {
  console.log("Editando asignatura con ID:", id);
  subjectEdit.mutate({ id, newValues });
};
  
   return {handleAddSubject,getSubjects,handleDeleteSubject,handleEditSubject};
   
}

export const useTopics = () =>{
  const queryClient = useQueryClient(); 
  const getTopics = async () => {

    const response = await axios.get("http://localhost:3000/topics");
    return response.data;
  };

  const addTopic = async (newTopic) =>{
   const response = await axios.post("http://localhost:3000/topics",newTopic)
   return response.data;
  }

  const createTopic = useMutation({
    mutationFn:addTopic,
    onSuccess: () =>{
      console.log("Tema añadido correctamente");
    queryClient.invalidateQueries(["topics"]);
    },
    
    onError:() =>{
      console.log(" Error al añadir tema");
    }
   
  });

  const handleAddTopic = (newTopic) =>{
    createTopic.mutate(newTopic);
  }


  const deleteTopic = async (id) => {
    const response = await axios.delete(`http://localhost:3000/topics/${id}`);
    return response;
  }

 const topicDelete = useMutation({
    mutationFn:deleteTopic,
    onSuccess:() =>{
      
      console.log("Tema borrado correctamente");
      queryClient.invalidateQueries("topics");

    },
    onError:() =>{
      console.log("Error al borrar tema");
    }
  })
 

 const handleDeleteTopic = (id) =>{
  topicDelete.mutate(id)
 }


 const editTopic = async ({ id, newValues }) =>{
  console.log("Editando tema con ID:", id, "y nuevos valores:", newValues);
  const response = await axios.put(`http://localhost:3000/topics/${id}`,newValues);
  return response.data;

};


const topicEdit  = useMutation({
  mutationFn:editTopic,
  onSuccess: () => {
    console.log("Asignatura editada correctamente");
    queryClient.invalidateQueries("topics");
  },
  onError: () =>{
    console.log("Error al editar Asignatura");
     // Verifica que el ID sea válido
  }
});

const handleEditTopic = ({ id, newValues }) => {
  console.log("Editando asignatura con ID:", id);
  topicEdit.mutate({ id, newValues });
};


  return {handleAddTopic,getTopics,handleDeleteTopic,handleEditTopic};
}


export const useEvents = () =>{

  const queryClient = useQueryClient();

  const getEvents =  () => {
    return axios.get("http://localhost:3000/events")
    .then(response => {
      return response.data;}
    );

    

  }



  const addEvent = async (newEvent) =>{
   const response = await axios.post("http://localhost:3000/events",newEvent);
    return response;
  }


  const eventAdd = useMutation({
    mutationFn:addEvent,
    onSuccess: () =>{
      queryClient.invalidateQueries("events");
      console.log("Evento creado correctamente");
      
    },
    onError: () =>{
      console.log("Error al añadir evento");
    }

  })

  const handleAddEvent = (newEvent) =>{
    eventAdd.mutate(newEvent);
  }

  return {handleAddEvent,getEvents}
}