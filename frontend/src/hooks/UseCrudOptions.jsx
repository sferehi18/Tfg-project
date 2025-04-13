import React from "react";
import Subjects from "../pages/Subjects";
import { useEvents, useSubjects, useTopics} from "./UseResources";
export function useCrudOptions() {
   const {handleAddSubject,handleDeleteSubject,handleEditSubject} = useSubjects();
    const {handleDeleteTopic,handleEditTopic,handleAddTopic} = useTopics();
    const {handleAddEvent,handleDeleteEvent} = useEvents();
    const subject = {
        createOption:{
            label: "Crear Asignatura", // Texto que se mostrará en la opción del menú
            action: handleAddSubject, // Función que se ejecutará al seleccionar la opción
            fields: ["name"], // Campos requeridos para crear una asignatura
        },

        deleteOption:{
            label: "Borrar", 
            action:handleDeleteSubject , 
            message: "¿Seguro que quieres borrar este Recurso y su asociados?",
            actionButtonStyle:"danger",
            
            
         },
   
         editOption: {
            label: "Editar", 
            action:handleEditSubject , 
            fields:["name"],
            actionButtonStyle:"warning",
           
         }

    }

    const topic = {

        createOption:{
            label: "Añadir Tema", // Texto que se mostrará en la opción del menú
            action: handleAddTopic, // Función que se ejecutará al seleccionar la opción
            fields: ["name"], // Campos requeridos para crear un tema
        },

        deleteOption:{
           label: "Borrar", 
           action: handleDeleteTopic, 
           message: "¿Seguro que quieres borrar este Recurso y su asociados?",
           actionButtonStyle:"danger",

           
           
        },
  
        editOption: {
           label: "Editar", 
           action: handleEditTopic, 
           fields:["name"],
           actionButtonStyle:"warning",
          
        }


      }

      const event = {
        createOption:{
            label: "Añadir Evento", // Texto que se mostrará en la opción del menú
            action: handleAddEvent, // Función que se ejecutará al seleccionar la opción
            fields: ["title"], // Campos requeridos para crear un tema
        },

        deleteOption:{
           label: "Borrar Evento", 
           action: handleDeleteEvent, 
           message: "¿Quieres borrar el evento?",
           actionButtonStyle:"danger",
        },
      }
    return {subject,topic,event};
}