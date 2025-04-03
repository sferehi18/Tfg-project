import React, { useContext } from "react";
import { Button, DropdownButton } from "react-bootstrap";
import CreationContext from "../context/ModalsMenusContext";
import OptionsList from "./OptionsList";
import {useSubjects, useTopics} from "../hooks/UseResources";
import { useParams } from "react-router-dom";
import SimpleIconButton from "./SimpleIconButton";

function ThreeDots({resourceId,resourceType}){
   const {openMenu,closeMenu} = useContext(CreationContext);
   const {subjectId} = useParams();
const {handleDeleteSubject,handleEditSubject} = useSubjects();
const {handleDeleteTopic,handleEditTopic} = useTopics();
    const menuId = "threedootsMenu" + resourceId;
    const modalId = "deleteResource" + resourceId;

    const subject = {
      deleteOption:{
         label: "Borrar", 
         action:handleDeleteSubject , 
         message: "¿Seguro que quieres borrar este Recurso y su asociados?",
         actionButtonStyle:"danger",
         resourceId: resourceId
         
      },

      editOption: {
         label: "Editar", 
         action:handleEditSubject , 
         fields:["name"],
         actionButtonStyle:"warning",
         resourceId: resourceId
      }
    }


    const topic = {
      deleteOption:{
         label: "Borrar", 
         action:() => handleDeleteTopic(resourceId), 
         message: "¿Seguro que quieres borrar este Recurso y su asociados?",
         actionButtonStyle:"danger",
         
         
      },

      editOption: {
         label: "Editar", 
         action: handleEditTopic, 
         fields:["name"],
         actionButtonStyle:"warning",
         resourceId: resourceId
      }
    }

   

 const options = resourceType === "subject" ? [subject.deleteOption, subject.editOption] : [topic.deleteOption,topic.editOption];
    

 

    return (
      <div   >
         <SimpleIconButton  style={{zIndex:'10'}} icon={"bi bi-three-dots-vertical"} className="card-text btn-sm " onClick={() => openMenu(menuId)}/>
        
    
     

           <OptionsList  style={{zIndex:1000}} optionsArray={options}  menuId={menuId} modalId={modalId} ></OptionsList>
      </div>
    
      
      

    );
}


export default ThreeDots