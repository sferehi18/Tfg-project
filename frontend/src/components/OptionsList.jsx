import React from "react";
import { Button, Dropdown, DropdownHeader, DropdownMenu } from "react-bootstrap";
import { useContext } from "react";
import CreationContext from "../context/ModalsMenusContext";
import ModalTemplate from "./ModalTemplate";

function OptionsList({optionsArray,menuId,modalId}){
const {isMenuOpen,openModal,isModalOpen,closeMenu} = useContext(CreationContext);
const handleOpenModal = () =>{
  closeMenu();
  openModal(modalId);
}


    return(
     
        <Dropdown show={(isMenuOpen === menuId) } >
        
  
        <Dropdown.Menu>
          {optionsArray.map((option) => (
            <div  key={option.label + menuId}>
               <Dropdown.Item onClick={ handleOpenModal} href="#">
             {option.label}
           
           </Dropdown.Item>
                   <ModalTemplate  title={option.label} fields={option.fields} modalId={modalId} action={option.action} ></ModalTemplate>
            </div>
            
          ))}
          
  
        </Dropdown.Menu>
    
      </Dropdown>

    );
}

export default OptionsList;