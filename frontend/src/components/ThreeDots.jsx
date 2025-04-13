import React, { useContext } from "react";
import { Button, DropdownButton } from "react-bootstrap";
import CreationContext from "../context/ModalsMenusContext";
import OptionsList from "./OptionsList";
import {useSubjects, useTopics} from "../hooks/UseResources";
import { useParams } from "react-router-dom";
import SimpleIconButton from "./SimpleIconButton";
import { useCrudOptions } from "../hooks/UseCrudOptions";

function ThreeDots({resourceId,resourceType}){
   const {openMenu,closeMenu} = useContext(CreationContext);
   const {subjectId} = useParams();
const {handleDeleteSubject,handleEditSubject} = useSubjects();
const {handleDeleteTopic,handleEditTopic} = useTopics();
const {subject,topic} = useCrudOptions();
    const menuId = "threedootsMenu" + resourceId;
    const modalId = "deleteResource" + resourceId;

   subject.deleteOption.resourceId = resourceId;
   subject.editOption.resourceId = resourceId;
   topic.editOption.resourceId = resourceId;
   topic.deleteOption.resourceId = resourceId;
   


   

 const options = resourceType === "subject" ? [subject.deleteOption, subject.editOption] : [topic.deleteOption,topic.editOption];
    

 

    return (
      <div   >
         <SimpleIconButton  style={{zIndex:'10'}} icon={"bi bi-three-dots-vertical"} className="card-text btn-sm " onClick={() => openMenu(menuId)}/>
        
    
     

           <OptionsList  style={{zIndex:1000}} optionsArray={options}  menuId={menuId} modalId={modalId} ></OptionsList>
      </div>
    
      
      

    );
}


export default ThreeDots