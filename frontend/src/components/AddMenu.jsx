import React, { useRef } from "react";
import { Modal, Button } from "react-bootstrap"; // Importamos los componentes de React Bootstrap
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import CreationContext from "../context/CreationContext";
// Función para agregar una asignatura

const addSubject = async (subject) => {

    const response = await axios.post("http://localhost:3000/subjects", subject);
    return response.data;
  
};

function AddMenu() {
  const queryClient = useQueryClient();
  const {isModalOpen,closeModal,closeMenu} = useContext(CreationContext);
  const mutation = useMutation({
    mutationFn: addSubject,
    onSuccess: () => {
      console.log("Asignatura añadida exitosamente");
      
      closeModal();
      queryClient.invalidateQueries("subjects");
    },
    onError: (err) => {
      console.error("Error al añadir asignatura:", err.message);
      alert("Error al añadir asignatura");
    },
  });

  const inputRef = useRef();

  const closeModalandMenu = () =>{
    closeMenu();
    closeModal();
  

  }

  const handleAddSubject = () => {
    const newSubject = { name: inputRef.current.value };
    mutation.mutate(newSubject);
    inputRef.current.value = "";
    closeModalandMenu();
  };

  return (
    <Modal show={isModalOpen} onHide={closeModal } centered>
      <Modal.Header >
        <Modal.Title>Añadir Asignatura</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <div className="form-floating">
          <input
            ref={inputRef}
            type="text"
            className="form-control"
            placeholder="Nombre de la asignatura"
          />
          <label>Nombre</label>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleAddSubject}>
          Añadir Asignatura
        </Button>
        <Button variant="secondary" onClick={closeModalandMenu}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddMenu;
