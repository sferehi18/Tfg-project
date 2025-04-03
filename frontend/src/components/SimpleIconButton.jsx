import React from "react";
import { Button } from "react-bootstrap";

function SimpleIconButton({ icon, onClick,color }) {
  return (
    <button style={{color:color}} className=' btn-icon'
     
      onClick={onClick}
    >
      <i className={icon}></i>
    </button>
  );
}

export default SimpleIconButton;