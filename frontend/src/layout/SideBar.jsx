import React, { useState } from "react";
import CreateButton from "../components/CreateButton";
import Navbutton from "../components/NavButton";
import { Link } from "react-router-dom";
import AddMenu from "../components/AddMenu";
import OptionsList from "../components/OptionsList";

function Sidebar() {
  //Esto es un estado global y hay que manejarlo como el creationContext
 const [isSelected,setIsSelected] = useState();

  return (
     
         <div className="sidebar bg-light " style={{ height: "100vh", zIndex: 1000 }}>
      <ul className="nav align-items-left flex-column">
        <li className="nav-item mb-4">
          <CreateButton text="Crear" icon="bi bi-plus"  >  </CreateButton>
       
        </li>
        
        <li className="nav-item p-2">
          <Link to="/" className="text-decoration-none">
            <Navbutton text="Página principal" icon="bi bi-house-door" id={1} isSelected={isSelected} setSelected={setIsSelected} />
          </Link>
        </li>
        <li className="nav-item mb-1 p-2">
          <Link to="/calendar" className="text-decoration-none">
            <Navbutton text="Calendario" icon="bi bi-calendar" id={2} isSelected={isSelected} setSelected={setIsSelected}  />
          </Link>
        </li>
        <li className="nav-item mb-1 p-2">
          <Navbutton text="Notificaciones" icon="bi bi-bell" id={3} isSelected={isSelected} setSelected={setIsSelected}  />
        </li>
        <li className="nav-item mb-1 p-2">
          <Navbutton text="Favoritos" icon="bi bi-heart" id={4} isSelected={isSelected} setSelected={setIsSelected}  />
        </li>
        <li className="nav-item mb-1 p-2">
          <Link to="/storage" className="text-decoration-none">
            <Navbutton text="Almacenamiento" icon="bi bi-cloud" id={5} isSelected={isSelected} setSelected={setIsSelected}  />
          </Link>
        </li>
      </ul>

      {/* Modal */}
      
    </div>
     
   
  );
}

export default Sidebar;
