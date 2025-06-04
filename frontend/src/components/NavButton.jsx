import React, { useState } from "react";
import { Router } from "react-router-dom";
function Navbutton({text,icon,isSelected,setSelected,id,onClick}){
 
  //Clases con los estilos por defecto que tendra el botón
 let defaultclasses=" btn-custom text-body   pb-2 pt-2 d-flex align-items-center rounded-3 ";

    
    return(
      //Creamos un botón con las clases declaradas y en caso de que sea seleccionado se le añadira la clase active de App.css
      //A su vez si se detecta que la opción fue seleccionada se mostrara el icono relleno en lugar de vacío
        <button className={ isSelected == id ? ` ${defaultclasses + " selected "}`: defaultclasses} onClick={onClick}>
       <i className={isSelected == id ? `${icon}-fill text-white ` : icon + " text-body" }></i> <span className="ms-2 hide " >{text}</span>
      </button>


    );
}

export default Navbutton;