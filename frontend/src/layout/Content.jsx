import React from "react";
import { Outlet } from "react-router-dom"; // Usamos Outlet para renderizar rutas hijas
import { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Importamos useLocation para obtener la ubicación actual
function Content() {
  const location = useLocation();
  useEffect(() => {
    console.log('La ubicación ha cambiado:', location);
  }, [location]);
  
  return (
    <div key={location.pathname}  className="d-flex flex-column   justify-content-start "  style={{ height: "82vh"}} >
      
      {/* Aquí renderizamos el contenido dinámicamente usando Outlet */}
      <Outlet 
       />
    </div>
  );
}

export default Content;

