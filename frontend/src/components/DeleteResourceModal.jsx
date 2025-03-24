import React, { useRef } from "react";
import { Modal, Button } from "react-bootstrap"; // Importamos los componentes de React Bootstrap
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import CreationContext from "../context/ModalsMenusContext";
// Función para agregar una asignatura
import useResources from "../hooks/UseSubjects";
import ModalTemplate from "./ModalTemplate";


function DeleteResourceModal({resourceId,resourceType,modalId}) {
  const queryClient = useQueryClient();
  
  const {closeModal} = useContext(CreationContext);
  const {deleteSubject} = useResources();

 

  
  const queryDeleteResource = useMutation({
    mutationFn: deleteSubject,
    onSuccess: () => {
      console.log("Asignatura añadida exitosamente");
      
      closeModal();
      queryClient.invalidateQueries("subject");
    },
    onError: (err) => {
      console.error("Error al añadir asignatura:", err.message);
      alert("Error al añadir asignatura");
    },
  });
  const handleDeleteResource = (resourceId) => {
    
    queryDeleteResource.mutate(resourceId);
    
    closeModal();
  };

  return (
    <ModalTemplate action={() => handleDeleteResource(resourceId)} actionText={"Borrar"}   title={"¿Estas seguro de borrar la asignatura y sus recursos?"} modalId={modalId} ></ModalTemplate>
  );
}

export default DeleteResourceModal;
