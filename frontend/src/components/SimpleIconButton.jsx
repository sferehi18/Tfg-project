import React from "react";
import { Button } from "react-bootstrap";

function SimpleIconButton({ icon, onClick,color,animationClass,stylesClass }) {
  return (
    <button style={{color:color}} className={` btn-icon ${animationClass} ${stylesClass} `}
     
      onClick={onClick}
    >
      <i className={icon}></i>
    </button>
  );
}

export default SimpleIconButton;