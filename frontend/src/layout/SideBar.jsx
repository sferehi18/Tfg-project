import React, { useState } from "react";
import ButtonPrimary from "../components/ButtonPrimary";
import Navbutton from "../components/NavButton";
import { Link } from "react-router-dom";
import AddMenu from "../components/AddMenu";
import OptionsList from "../components/OptionsList";
import { CreationProvider } from "../context/CreationContext";
function Sidebar() {
 
  return (
      <CreationProvider>
         <div className="sidebar bg-light p-1" style={{ height: "100vh", zIndex: 1000 }}>
      <ul className="nav align-items-left flex-column">
        <li className="nav-item mb-4">
          <ButtonPrimary text="Crear" icon="bi bi-plus"  >  </ButtonPrimary>
       
        </li>
        
        <li className="nav-item p-2">
          <Link to="/" className="text-decoration-none">
            <Navbutton text="Página principal" icon="bi bi-house-door" />
          </Link>
        </li>
        <li className="nav-item mb-1 p-2">
          <Link to="/calendar" className="text-decoration-none">
            <Navbutton text="Calendario" icon="bi bi-calendar" />
          </Link>
        </li>
        <li className="nav-item mb-1 p-2">
          <Navbutton text="Notificaciones" icon="bi bi-bell" />
        </li>
        <li className="nav-item mb-1 p-2">
          <Navbutton text="Favoritos" icon="bi bi-heart" />
        </li>
        <li className="nav-item mb-1 p-2">
          <Link to="/storage" className="text-decoration-none">
            <Navbutton text="Almacenamiento" icon="bi bi-cloud" />
          </Link>
        </li>
      </ul>

      {/* Modal */}
      
    </div>
      </CreationProvider>
   
  );
}

export default Sidebar;
