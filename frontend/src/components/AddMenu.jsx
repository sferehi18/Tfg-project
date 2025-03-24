import React, { useRef } from "react";
import { Modal, Button } from "react-bootstrap"; // Importamos los componentes de React Bootstrap
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import CreationContext from "../context/ModalsMenusContext";
// Función para agregar una asignatura
import useSubjects from "../hooks/UseSubjects";
import ModalTemplate from "./ModalTemplate";


function AddMenu({modalId,resourceType}) {


  return (
    <ModalTemplate action={handleAddSubject}  actionText={"Crear"} fields={["name"]} title={"Añadir asignatura"} modalId={modalId} ></ModalTemplate>
  );
}

export default AddMenu;
