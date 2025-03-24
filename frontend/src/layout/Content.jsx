import React from "react";
import { Outlet } from "react-router-dom"; // Usamos Outlet para renderizar rutas hijas

function Content() {


  return (
    <div >
      
      {/* Aquí renderizamos el contenido dinámicamente usando Outlet */}
      <Outlet 
       />
    </div>
  );
}

export default Content;

