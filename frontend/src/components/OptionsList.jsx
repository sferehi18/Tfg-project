import React from "react";
import { Button, Dropdown, DropdownHeader, DropdownMenu } from "react-bootstrap";
import { useContext } from "react";
import CreationContext from "../context/CreationContext";

function OptionsList(){
const {isMenuOpen,openModal,isModalOpen} = useContext(CreationContext);
    return(
     
        <Dropdown show={isMenuOpen && !isModalOpen } >
        
  
        <Dropdown.Menu>
          <Dropdown.Item onClick={openModal} href="">Crear Asignatura <i className="bi bi-folder"></i></Dropdown.Item>
          <Dropdown.Item onClick={openModal} href="">Another action</Dropdown.Item>
          <Dropdown.Item onClick={openModal} href="#/action-3">Something else</Dropdown.Item>
    
        </Dropdown.Menu>
       
      </Dropdown>
    );
}

export default OptionsList;