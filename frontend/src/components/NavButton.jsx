import React from "react";
import { Router } from "react-router-dom";
function Navbutton({text,icon,onClick}){
 
    
    return(
        <button className="btn btn-link d-flex align-items-center rounded-5 bg-black bg-opacity-10 text-black" onClick={onClick}>
       <i className={icon}></i> <span className="ms-2 hide" >{text}</span>
      </button>


    );
}

export default Navbutton;