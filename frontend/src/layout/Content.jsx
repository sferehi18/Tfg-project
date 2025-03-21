import React from "react";
import { Outlet } from "react-router-dom"; // Usamos Outlet para renderizar rutas hijas

function Content() {
  const contentStyle = {
    height: "75vh",
    borderRadius: "10px",
    gap: "100px",
  };

  return (
    <div  className='bg-white' style={contentStyle}>
      
      {/* Aquí renderizamos el contenido dinámicamente usando Outlet */}
      <Outlet 
       />
    </div>
  );
}

export default Content;

