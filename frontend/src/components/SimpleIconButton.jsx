import React from "react";
import { Button } from "react-bootstrap";

function SimpleIconButton({ icon, onClick,color,animationClass,stylesClass, hover}) {
  const iconstyle = hover ? "btn-icon" : "btn-icon2"; // Si se pasa la prop hover, se aplica la clase hover
  return (
    <button style={{color:color}} className={` ${iconstyle} rounded-4 bg-opacity-25 ${animationClass} ${stylesClass} `}
     
      onClick={onClick}
    >
     
      {/* Renderiza el icono pasado como prop */}
      <i className={icon}></i>
    
    </button>
  );
}

export default SimpleIconButton;