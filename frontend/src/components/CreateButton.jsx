import React from "react";
import { useContext } from "react";
import CreationContext from "../context/ModalsMenusContext";
import OptionsList from "./OptionsList";
import { useQueryClient } from "@tanstack/react-query";
import { useTopics,useSubjects } from "../hooks/UseResources";
import { useCrudOptions } from "../hooks/UseCrudOptions";

/** 
  Componente CreateButton:
  - Renderiza un botón principal para la creación de recursos.
  - Al hacer clic, abre un menú con opciones de creación.
  Props:
 @param {string} text Texto del botón
 @param {string} icon Determina el icono del botón Ejemplo(bi bi-plus) 
*/

function CreateButton({ text, icon }) {
  // Usamos el contexto CreationContext para manejar la apertura y cierre de menús y modales
  const { openMenu, closeMenu, closeModal,isMenuOpen} = useContext(CreationContext);
  const {subject} = useCrudOptions();
  
  // Definimos un identificador único para el menú de opciones que abrirá este botón
  const menuId = "creationMenu";
  // Obtenemos la función para añadir asignaturas desde el hook useTopics
  const {handleAddTopic} = useTopics();

  const topic = {
    label: "Crear Tema", // Texto que se mostrará en la opción del menú
    action: handleAddTopic, // Función que se ejecutará al seleccionar la opción
    fields: ["name"], // Campos requeridos para crear una asignatura
  };

  return (
    <div  >
      {/* Botón de creación que al hacer clic abre el menú de opciones */}
      <button
        className="btn btn-primary d-flex align-items-center p-3 mt-3"
        onClick={() => openMenu(menuId)}
      >
        <i className={icon}></i> {/* Ícono del botón */}
        <span className="ms-2 hide">{text}</span> {/* Texto del botón */}
      </button>

      {/* Menú de opciones que se mostrará cuando se haga clic en el botón */}
       <OptionsList   optionsArray={[subject.createOption,topic]} menuId={menuId} />
    </div>
  );
}

export default CreateButton;
