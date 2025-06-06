import { useState, useEffect } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import TokenContext from "../context/AuthContext";
import CreationContext from "../context/ModalsMenusContext";
import { useNavigate } from "react-router-dom";

import ToastContext from "../context/ToastContext";
import { useAuth } from "./useLogin";
const BASE_DOMAIN = "http://localhost:8080";
// Hook para manejar las asignaturas, temas y eventos
// Este hook utiliza React Query para manejar las peticiones a la API y el estado de los datos
export function useSubjects() { 
  const navigate = useNavigate();
 const { token, setNewToken } = useContext(TokenContext);
 const {setShow,handleShow} = useContext(ToastContext);
 const { redirectToLogin } = useAuth();// Funcion del Hook de login para manejar la redirección al login

  //Definimos queryClient para poder invalidar las queries, es decir, decir que unos datos ya no estan actualizados y forzar un refetch
  const queryClient = useQueryClient(); 
  
  const BASE_URL_PRO= "https://api.escuelavirtual.com";
//Obtener Asignaturas
  const getSubjects = async () => {
  
    return axios.get(`${BASE_DOMAIN}/subjects/`,{
     withCredentials: true
    })
      .then(response => {
        return response.data;
      }).catch((error) => {
       
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.log(`Error al obtener las asignaturas:`, error.response); // Redirige al usuario a la página de inicio de sesión
        }
       
      })
   
    
     
  };


  //Crear Asignaturas
  const addSubject = async (subject) => {

    const response = await axios.post(`${BASE_DOMAIN}/subjects/create`, subject,{
      withCredentials: true
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
   redirectToLogin(err);
 
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
 
    const response = await axios.delete(`${BASE_DOMAIN}/subjects/${id}`,{
      withCredentials: true
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
  const response = await axios.put(`${BASE_DOMAIN}/subjects/${id}`,newValues,{
    withCredentials: true
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
  const response = await axios.patch(
    `${BASE_DOMAIN}/subjects/${id}/favorite`,
    JSON.stringify(isFavorite), // Convertir a JSON explícitamente
    {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    }
  );
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
  
  

  const queryClient = useQueryClient(); 
  const BASE_URL = `${BASE_DOMAIN}/subjects/`;
  const getTopics = async (subjectId) => {

    const response = await axios.get(`${BASE_URL}${subjectId}/topics/`,
      {
        withCredentials: true
      }
    );
    
    return response.data;
  };

  const getAllTopics = async () => {
   
    const response = await axios.get(`${BASE_DOMAIN}/topics/All`,
      {
        withCredentials: true
      }
    );
    
    return response.data;
  };

  const addTopic = async ({id,newValues}) =>{
    console.log("Añadiendo nuevo tema:", newValues, "a la asignatura con ID:", id);
   const response = await axios.post(`${BASE_URL}${id}/topics/create`,newValues,{
    withCredentials: true
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
    const response = await axios.delete(`${BASE_DOMAIN}/topics/${id}/delete`,{
      withCredentials: true
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
  const response = await axios.put(`${BASE_DOMAIN}/topics/${id}/edit`,newValues,{
    withCredentials: true
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
  
  


  const getEvents = async () => {
    return axios.get(`${BASE_DOMAIN}/events/`,{
      withCredentials: true
    })
    .then(response => {
      return response.data;}
    );

    

  }



  const addEvent = async (newEvent) =>{
   const response = await axios.post(`${BASE_DOMAIN}/events/create`,newEvent,{
    withCredentials: true
   });
    return response;
  }

  const deleteEvent = async (id) => {
    const response = await axios.delete(`${BASE_DOMAIN}/events/delete/${id}`,{
      withCredentials: true
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
  
  

const  getFiles = async (id) => {
    const response = await axios.get(`${BASE_DOMAIN}/topics/${id}/files/`,{
      withCredentials: true
    });
    return response.data;
  }

  const  getAllFiles = async () => {
    const response = await axios.get(`${BASE_DOMAIN}/files/`,{
      withCredentials: true
    });
    return response.data;
  }

  const uploadFileDirectToSupabase = async (file, userId) => {
  const projectRef = "astxfoxaqlvqejfvpmzd";
  const bucket = "uploads";
  const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzdHhmb3hhcWx2cWVqZnZwbXpkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTIwMjM4NCwiZXhwIjoyMDY0Nzc4Mzg0fQ.QxhuOJ9gaMnuitVg0OBybcLl4Z9oEInd5LsppOLrRgY";

  const fileName = file.name;
  const objectPath = `${userId}/${fileName}`;
  const uploadUrl = `https://${projectRef}.supabase.co/storage/v1/object/${bucket}/${objectPath}`;

  try {
    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
        "Authorization": `Bearer ${serviceRoleKey}`,
      },
      body: file,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al subir a Supabase: ${response.status} - ${errorText}`);
    }

    console.log("Subida exitosa a Supabase Storage");

    return {
      filePath: objectPath,
      name: fileName,
      type: file.type,
      size: file.size,
      url: `https://${projectRef}.supabase.co/storage/v1/object/public/${bucket}/${objectPath}`
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};


  const addFiles = async ({ id, newFile }) => {
    console.log("Añadiendo nuevo archivo:", newFile, "al tema con ID:", id);
    
    const formData = new FormData();
    formData.append("file", newFile); // "file" debe coincidir con @RequestParam("file") en tu backend
  
    const response = await axios.post(
      `${BASE_DOMAIN}/topics/${id}/files/upload`,
      formData,
      { 
        
        withCredentials: true // Asegúrate de enviar las cookies de sesión si es necesario
      }
    );
  
    return response.data;
  };

  const fileAdd = useMutation({
    mutationFn: addFiles,
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
// Función para abrir un archivo en una nueva pestaña del navegador
  const handleOpenFile = (fileId) => {
    // Realiza una solicitud GET para obtener el archivo como un blob (contenido binario)
    axios.get(`${BASE_DOMAIN}/files/${fileId}/open`, {
     withCredentials:true,
      responseType: 'blob' // Especifica que la respuesta será un blob (archivo binario)
    })
      .then((response) => {
        // Crea un objeto Blob a partir de los datos binarios recibidos
        const file = new Blob([response.data], { type: response.headers['content-type'] });
        // Crea una URL temporal para el archivo Blob
        const fileURL = URL.createObjectURL(file);
        // Abre el archivo en una nueva pestaña del navegador
        window.open(fileURL, "_blank");
      })
      .catch((error) => {
        // Maneja errores si la solicitud o procesamiento del archivo falla
        console.error("Error al abrir el archivo:", error);
      });
  }

  const deleteFile = async (id) => {
    const response = await axios.delete(`${BASE_DOMAIN}/files/${id}/delete`,{
      withCredentials: true
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
  return {getFiles,getAllFiles,handleAddFile,handleDeleteFile,handleOpenFile,uploadFileDirectToSupabase};
}

export const useUsers = () => {
  
  const BASE_URL = `${BASE_DOMAIN}/user/`;
   
  const getUserDetails = async (token) =>{
 
 return axios.get(`${BASE_URL}userDetails`,{
      withCredentials: true
    })
    .then(response => {
      return response.data;}
    );
    
  }
  return { getUserDetails };
}