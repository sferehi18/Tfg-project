import React from "react";
import Buttonprimary from "./ButtonPrimary";
function Eventmenu({ onAddEvent, onClose}) {
  const menustyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    zindex: "100000",
   
    width: "200px",
    height: "200px",
    
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
  };
  
  return (
      <div className="me-1 bg-white">
      <div className="form-group " style={menustyle}  >
        <div className="form-header">
          <h3>Evento</h3>
        </div>
        <div className="form-floating">
          <input type="text" id="Titulo" className="form-control" />
          <label for="Titulo">Titulo</label>
        </div>
        
       <Buttonprimary text="Añadir Evento" onClick={() => onAddEvent(document.getElementById("Titulo").value)} />
       <Buttonprimary text="Cerrar Menú" onClick={() => onClose() } />
        
      </div>

    </div>
    
    
  );
  
}

export default Eventmenu;
