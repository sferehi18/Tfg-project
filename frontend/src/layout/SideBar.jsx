import React, { useEffect, useMemo, useState } from "react";
import CreateButton from "../components/CreateButton";
import Navbutton from "../components/NavButton";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useLogin";
import logo2 from "../assets/logo2.png"; // Asegúrate de que la ruta sea correcta
function Sidebar() {
  // Estado para controlar qué botón de navegación está seleccionado
  // Se podría manejar con un estado global (ej. Context API o Zustand) si es necesario en toda la app
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(null);
  const { logout } = useAuth();
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
    <div
      className="sidebar d-flex  flex-column justify-content-between align-items-start"
      style={{ zIndex: 200, height: "100vh" }}
    >
      <div className="w-100">
        <div className="d-flex align-items-center justify-content-start p-1">
          <img src={logo2} alt="Logo" className="logo" />
          <h3 className="ms-2 fs-4 fw-bold  hide">edu-vault</h3>
        </div>

        <ul className="d-flex flex-column ms-3 align-items-start  gap-4 p-0 w-100">
          {/* Todos los botones excepto cerrar sesión */}
          <li className="mt-5">
            <Link to="/subjects" className="text-decoration-none">
              <Navbutton
                
                text="Página principal"
                icon="bi bi-house-door"
                id="Home"
                isSelected={isSelected}
                onClick={() => handleButtonSelect("Home")}
              />
            </Link>
          </li>
          <li>
            <Link to="/calendar" className="text-decoration-none">
              <Navbutton
                text="Calendario"
                icon="bi bi-calendar"
                id="calendar"
                isSelected={isSelected}
                onClick={() => handleButtonSelect("calendar")}
              />
            </Link>
          </li>
          <li>
            <Link to="/favourites" className="text-decoration-none">
              <Navbutton
                text="Favoritos"
                icon="bi bi-heart"
                id="fav"
                isSelected={isSelected}
                onClick={() => handleButtonSelect("fav")}
              />
            </Link>
          </li>
          <li>
            <Link to="/storage" className="text-decoration-none">
              <Navbutton
                text="Almacenamiento"
                icon="bi bi-cloud"
                id="storage"
                isSelected={isSelected}
                onClick={() => handleButtonSelect("storage")}
              />
            </Link>
          </li>
        </ul>
      </div>

      {/* Botón de logout en la parte inferior */}
      <div className="mb-4 ">
        <Link to="/UserSettings" className="text-decoration-none ">
          <Navbutton
            text="Configuración"
            icon="bi bi-gear"
            id="userSettings"
            isSelected={isSelected}
            onClick={() => handleButtonSelect("userSettings")}
          />
        </Link>
      </div>
      <div className="mb-4 ">
       
          <Navbutton
            text="Cerrar sesión"
            icon="bi bi-box-arrow-right"
            id="logout"
            isSelected={isSelected}
            onClick={() => {
              logout();
              navigate("/login")
            
            }}
          />
       
      </div>
    </div>
  );
}

export default Sidebar;
