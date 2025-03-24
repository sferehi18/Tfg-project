import React, { useState } from "react";
import { Router } from "react-router-dom";
function Navbutton({text,icon,isSelected,setSelected,id}){
 

 let defaultclasses="btn btn-custom d-flex align-items-center rounded-5 ";

    
    return(
        <button className={ isSelected == id ? ` ${defaultclasses + " active"}`: defaultclasses} onClick={() => setSelected(id)}>
       <i className={isSelected == id ? `${icon}-fill` : icon}></i> <span className="ms-2 hide" >{text}</span>
      </button>


    );
}

export default Navbutton;