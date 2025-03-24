import React, { useContext } from "react";
import { Button, DropdownButton } from "react-bootstrap";
import CreationContext from "../context/ModalsMenusContext";
import OptionsList from "./OptionsList";
import { useMutation } from "@tanstack/react-query";
import DeleteResourceModal from "./DeleteResourceModal";
import ConfirmActionModal from "./ConfirmActionModal";
import useSubjects from "../hooks/UseSubjects";

function ThreeDots({resourceId}){
   const {openMenu,closeMenu} = useContext(CreationContext);
   const {handleAddSubject} = useSubjects();
    const menuId = "edit&deleteMenu";
    const modalId = "deleteResource";
    const option = {
      label: "Editar", 
      action: handleAddSubject , 
 
      
 
      
   };

    return (

    <Button  style={{zIndex:'10'}} className="card-text btn-sm " onClick={() => openMenu(menuId+resourceId)}>
         <i className="bi bi-three-dots-vertical"></i>
      <OptionsList style={{zIndex:1000}} optionsArray={[option]} menuId={menuId+resourceId} modalId={modalId} ></OptionsList>
     
      </Button>
      
      

    );
}


export default ThreeDots