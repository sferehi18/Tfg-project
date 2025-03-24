import React from "react";
import { useContext } from "react";
import CreationContext from "../context/ModalsMenusContext";
import OptionsList from "./OptionsList";
import AddMenu from "./AddMenu";
import { DropdownButton } from "react-bootstrap";
import { useQueryClient } from "@tanstack/react-query";
import useSubjects from "../hooks/UseSubjects";
import { useMutation } from "@tanstack/react-query";
function CreateButton({ text, icon}) {
const {openMenu,closeMenu,closeModal} = useContext(CreationContext);

const menuId = "creationMenu";
  const queryClient = useQueryClient();
 

  const {handleAddSubject} = useSubjects();
  
  const subject = {
     label: "Crear Asignatura", 
     action: handleAddSubject , 
    fields:["name"]
     

     
  };
  return(
  
 <div >
      <button
        className="btn btn-primary d-flex align-items-center p-3 mt-3"
        onClick={ () => openMenu(menuId)}
        
        // Si necesitas alguna acción adicional cuando se haga clic en el botón
>
        <i className={icon}></i> <span className="ms-2 hide">{text}</span>
      </button>
      <OptionsList optionsArray={[subject]} menuId={menuId} ></OptionsList>
     
    </div>
   
   
  );
}

export default CreateButton;
