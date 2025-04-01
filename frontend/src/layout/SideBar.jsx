import React, { useEffect, useMemo, useState } from "react";
import CreateButton from "../components/CreateButton";
import Navbutton from "../components/NavButton";
import { Link } from "react-router-dom";

function Sidebar() {
  
  // Estado para controlar qué botón de navegación está seleccionado
  // Se podría manejar con un estado global (ej. Context API o Zustand) si es necesario en toda la app

  const [isSelected, setIsSelected] = useState(null);

  useEffect(() => {
    const selectedButton = localStorage.getItem("selectedButton");
    if (selectedButton) {
      setIsSelected(selectedButton); // Asigna el valor al estado
    }
  }, []);

  // Guarda el valor del botón seleccionado en localStorage
  const handleButtonSelect = (buttonId) => {
    setIsSelected(buttonId);
    localStorage.setItem("selectedButton", buttonId); // Guarda el id del botón seleccionado
  };


   
  



  return (
   
    <div className="sidebar bg-light" style={{ height: "100vh", zIndex: 1000 }}>
      
      <ul className="nav align-items-left flex-column">
        {/* Botón para crear nuevos elementos */}
        <li className="nav-item mb-4">
          <CreateButton text="Crear" icon="bi bi-plus" />
        </li>

        {/* Botón de navegación a la página principal */}
        <li className="nav-item p-2">
          <Link to="/" className="text-decoration-none">
            <Navbutton
              text="Página principal"
              icon="bi bi-house-door"
              id="Home"
              isSelected={isSelected}
              setSelected={handleButtonSelect}
            />
          </Link>
        </li>

        {/* Botón de navegación al calendario */}
        <li className="nav-item mb-1 p-2">
          <Link to="/calendar" className="text-decoration-none">
            <Navbutton
              text="Calendario"
              icon="bi bi-calendar"
              id="calendar"
              isSelected={isSelected}
              setSelected={handleButtonSelect}
            />
          </Link>
        </li>

        {/* Botón de notificaciones (sin enlace) */}
        <li className="nav-item mb-1 p-2">
          <Navbutton
            text="Notificaciones"
            icon="bi bi-bell"
            id="notis"
            isSelected={isSelected}
            setSelected={handleButtonSelect}
          />
        </li>

        {/* Botón de favoritos (sin enlace) */}
        <li className="nav-item mb-1 p-2">
          <Navbutton
            text="Favoritos"
            icon="bi bi-heart"
            id="fav"
            isSelected={isSelected}
            setSelected={handleButtonSelect}
          />
        </li>

        {/* Botón de almacenamiento */}
        <li className="nav-item mb-1 p-2">
          <Link to="/storage" className="text-decoration-none">
            <Navbutton
              text="Almacenamiento"
              icon="bi bi-cloud"
              id="storage"
              isSelected={isSelected}
              setSelected={handleButtonSelect}
            />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
