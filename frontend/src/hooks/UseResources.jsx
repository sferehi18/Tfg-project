import { useState, useEffect } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import TokenContext from "../context/AuthContext";
import CreationContext from "../context/ModalsMenusContext";
import { useNavigate } from "react-router-dom";

import ToastContext from "../context/ToastContext";

// Hook para manejar las asignaturas, temas y eventos
// Este hook utiliza React Query para manejar las peticiones a la API y el estado de los datos
export function useSubjects() { 
  const navigate = useNavigate();
 const { token, setNewToken } = useContext(TokenContext);
 const {setShow,handleShow} = useContext(ToastContext);
 
  const authHeaders = { 
  "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`

}
  //Definimos queryClient para poder invalidar las queries, es decir, decir que unos datos ya no estan actualizados y forzar un refetch
  const queryClient = useQueryClient(); 
  
//Obtener Asignaturas
  const getSubjects = async () => {
    console.log("Obteniendo asignaturas desde el backend... con token:", localStorage.getItem("token"));
    return axios.get("http://localhost:8080/subjects/",{
     headers:authHeaders
    })
      .then(response => {
        return response.data;
      })
   
    
     
  };


  //Crear Asignaturas
  const addSubject = async (subject) => {

    const response = await axios.post("http://localhost:8080/subjects/create", subject,{
      headers:authHeaders
    });
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
    handleShow({color:"success",
      headerText:"Recurso creado correctamente",
      bodyText:"Nueva Asignatura disponible"
    });
  },
  onError: (err) => {
    console.error("Error al añadir asignatura:", err.response?.data || err.message);
 
     handleShow({color:"danger",
      headerText:"Error al crear recurso",
   bodyText: err.response?.data?.detail


    });
  },
});
const handleAddSubject = (newSubject) => {
 
  createSubject.mutate(newSubject);
  
  
};

//Borrar asignaturas

const deleteSubject = async (id) => {
 
    const response = await axios.delete(`http://localhost:8080/subjects/${id}`,{
      headers:authHeaders
    });
    
    
    return response;
  
};

const subjectDelete = useMutation({
  mutationFn: deleteSubject,
  onSuccess: () =>{
    queryClient.invalidateQueries("subjects");
    handleShow({color:"success",
      headerText:"Asignatura borrada correctamente",
      bodyText:"Todos los temas y archivos asociados a esta asignatura han sido eliminados"
    });

  },
  onError: (err)=> {
     handleShow({color:"danger",
      headerText:"Error al borrar asignatura",
      bodyText: err.response?.data?.detail


    });
  }
})

const handleDeleteSubject = (id) => {
  subjectDelete.mutate(id);
}


//Editar Asignatura
const editSubject = async ({ id, newValues }) =>{
  console.log("Editando asignatura con ID:", id, "y nuevos valores:", newValues);
  const response = await axios.put(`http://localhost:8080/subjects/${id}`,newValues,{
    headers:authHeaders
  });
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

const markasfavorite = async ({ id, isFavorite }) => {
  const response = await axios.patch(`http://localhost:8080/subjects/${id}/favorite`, isFavorite, {
    headers: authHeaders,
  });
  return response.data;
};


const subjectMarkAsFavorite = useMutation({
  mutationFn: markasfavorite,
  onSuccess: () => {
    console.log("Asignatura marcada como favorita");
    queryClient.invalidateQueries("subjects");

  },
  onError: () => {
    console.log("Error al marcar asignatura como favorita");
  }
})

const handleMarkAsFavorite = (id, isFavorite) => {
  console.log(`Marcando asignatura ${id} como favorita: ${isFavorite}`);
  subjectMarkAsFavorite.mutate({ id, isFavorite });
};

  
   return {handleAddSubject,getSubjects,handleDeleteSubject,handleEditSubject,handleMarkAsFavorite};
   
}

export const useTopics = () =>{
  const {setShow,handleShow} = useContext(ToastContext);
  const {token} = useContext(TokenContext);
  
  const authHeaders = { 
  "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`

}
  const queryClient = useQueryClient(); 
  const BASE_URL = "http://localhost:8080/subjects/";
  const getTopics = async (subjectId) => {

    const response = await axios.get(`${BASE_URL}${subjectId}/topics/`,
      {
        headers:authHeaders
      }
    );
    
    return response.data;
  };

  const getAllTopics = async () => {
   
    const response = await axios.get(`http://localhost:8080/topics/All`,
      {
        headers:authHeaders
      }
    );
    
    return response.data;
  };

  const addTopic = async ({id,newValues}) =>{
    console.log("Añadiendo nuevo tema:", newValues, "a la asignatura con ID:", id);
   const response = await axios.post(`${BASE_URL}${id}/topics/create`,newValues,{
    headers:authHeaders
   })
   return response.data;
  }

  const createTopic = useMutation({
    mutationFn:addTopic,
    onSuccess: () =>{
      console.log("Tema añadido correctamente");
      
    queryClient.invalidateQueries(["topics"]);
    handleShow({color:"success",
      headerText:"Tema creado correctamente",
      bodyText:"Nuevo Tema disponible"
    });
    },
    
    onError:(err) =>{
      handleShow({color:"danger",
      headerText:"Error al añadir tema",
      bodyText:err.response?.data?.detail || "No se ha podido añadir el tema"
    });
      console.log(" Error al añadir tema");
    }
   
  });

  const handleAddTopic = ({id,newValues}) =>{
 
    createTopic.mutate({id,newValues});
  }


  const deleteTopic = async (id) => {
    const response = await axios.delete(`http://localhost:8080/topics/${id}/delete`,{
      headers:authHeaders
    });
    return response;
  }

 const topicDelete = useMutation({
    mutationFn:deleteTopic,
    onSuccess:() =>{
      handleShow({color:"success",
      headerText:"Tema borrado correctamente",
      bodyText:"Todos los archivos asociados a este tema han sido eliminados"
    });
      console.log("Tema borrado correctamente");
      queryClient.invalidateQueries("topics");

    },
    onError:(err) =>{
      handleShow({color:"danger",
      headerText:"Tema borrado correctamente",
      bodyText:"No se ha podido eliminar el tema"
    });

    }
  })
 

 const handleDeleteTopic = (id) =>{
  topicDelete.mutate(id);
  console.log("Borrando tema con ID:", id);
 }


 const editTopic = async ({ id, newValues }) =>{
  console.log("Editando tema con ID:", id, "y nuevos valores:", newValues);
  const response = await axios.put(`http://localhost:8080/topics/${id}/edit`,newValues,{
    headers:authHeaders
  });
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


  return {handleAddTopic,getTopics,getAllTopics,handleDeleteTopic,handleEditTopic};
}


export const useEvents = () =>{
  const {setShow,handleShow} = useContext(ToastContext);
  const queryClient = useQueryClient();
  const { closeModal } = useContext(CreationContext);
  const {token} = useContext(TokenContext);
  
  const authHeaders = { 
  "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`

}

  const getEvents = async () => {
    return axios.get("http://localhost:8080/events/",{
      headers:authHeaders
    })
    .then(response => {
      return response.data;}
    );

    

  }



  const addEvent = async (newEvent) =>{
   const response = await axios.post("http://localhost:8080/events/create",newEvent,{
    headers:authHeaders
   });
    return response;
  }

  const deleteEvent = async (id) => {
    const response = await axios.delete(`http://localhost:8080/events/delete/${id}`,{
      headers:authHeaders
    });
    return response;
  }
  
  const eventDelete = useMutation({
    mutationFn:deleteEvent,
    onSuccess: () =>{
      queryClient.invalidateQueries("events");
      handleShow({color:"success",
      headerText:"Evento borrado correctamente",
      bodyText:"El evento ha sido eliminado del calendario"
    });

      console.log("Evento borrado correctamente");
      closeModal();
    },
    onError: () =>{
      handleShow({color:"danger",
      headerText:"Error al borrar evento",
      bodyText:"No se ha podido eliminar el evento del calendario"
    });
     
    }
  })

  const handleDeleteEvent = (id) =>{
    eventDelete.mutate(id);
  }


  const eventAdd = useMutation({
    mutationFn:addEvent,
    onSuccess: () =>{
      handleShow({color:"success",
      headerText:"Evento creado correctamente",
      bodyText:"Nuevo evento añadido al calendario"
    });
      queryClient.invalidateQueries("events");
      console.log("Evento creado correctamente");
      
    },
    onError: () =>{
      handleShow({color:"danger",
      headerText:"Error al añadir evento",
      bodyText:"No se ha podido añadir el evento al calendario"
    });
      console.log("Error al añadir evento");
    }

  })

  const handleAddEvent = (newEvent) =>{
    eventAdd.mutate(newEvent);
  }

  return {handleAddEvent,getEvents,handleDeleteEvent}
  

}

export const useFiles = () =>{
  const queryClient = useQueryClient();
  const {setShow,handleShow} = useContext(ToastContext);
  const {token} = useContext(TokenContext);
  
  const authHeaders = { 
  "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`

}
const  getFiles = async (id) => {
    const response = await axios.get(`http://localhost:8080/topics/${id}/files/`,{
      headers:authHeaders
    });
    return response.data;
  }

  const  getAllFiles = async () => {
    const response = await axios.get(`http://localhost:8080/files/`,{
      headers:authHeaders
    });
    return response.data;
  }

  const addFiles = async ({ id, newFile }) => {
    console.log("Añadiendo nuevo archivo:", newFile, "al tema con ID:", id);
    
    const formData = new FormData();
    formData.append("file", newFile); // "file" debe coincidir con @RequestParam("file") en tu backend
  
    const response = await axios.post(
      `http://localhost:8080/topics/${id}/files/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          
        },
      }
    );
  
    return response.data;
  };

  const fileAdd = useMutation({
    mutationFn:addFiles,
    onSuccess: () =>{
   
      queryClient.invalidateQueries("files");
         handleShow({color:"success",
      headerText:"Archivo añadido correctamente",
      bodyText:"Nuevo archivo disponible en el tema"
    });
      console.log("Archivo añadido correctamente");
    },
    onError: () =>{
      handleShow({color:"danger",
      headerText:"Error al añadir archivo",
      bodyText:"No se ha podido añadir el archivo al tema"
    });
      console.error("Error al añadir archivo:", error?.response?.data || error.message);
    }
  })

  const handleAddFile = ({id,newFile}) => {
    fileAdd.mutate({id,newFile});
  }


  const deleteFile = async (id) => {
    const response = await axios.delete(`http://localhost:8080/files/${id}/delete`,{
      headers:authHeaders
    });
    return response.data;
  }

  const fileDelete = useMutation({
    mutationFn:deleteFile,
    onSuccess: () =>{
      handleShow({color:"success",
      headerText:"Archivo borrado correctamente",
      bodyText:"El archivo ha sido eliminado del tema"
    });
      queryClient.invalidateQueries("files");
      console.log("Archivo borrado correctamente");
    },
    onError: () =>{
      handleShow({color:"danger",
      headerText:"Error al borrar archivo",
      bodyText:"No se ha podido eliminar el archivo del tema"
    });
      console.log("Error al borrar archivo");
    }
  })

  const handleDeleteFile = (id) =>{
    fileDelete.mutate(id);
  }
  return {getFiles,getAllFiles,handleAddFile,handleDeleteFile};
}

export const useUsers = () => {
  const { token } = useContext(TokenContext);
 

  const queryClient = useQueryClient();
  const BASE_URL = `http://localhost:8080/user/`;
   
  const getUserDetails = async (token) =>{
   const authHeaders = { 
  "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`

}
 return axios.get(`${BASE_URL}userDetails`,{
      headers:authHeaders
    })
    .then(response => {
      return response.data;}
    );
    
  }
  return { getUserDetails };
}