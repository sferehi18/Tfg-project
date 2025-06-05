import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom"; // Usamos Outlet para renderizar rutas hijas
import { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Importamos useLocation para obtener la ubicación actual
import TokenContext from "../context/AuthContext";
import ToastTemplate from "../components/ToastTemplate";
import ToastContext from "../context/ToastContext";
function Content() {
  const location = useLocation();
  const {isTokenValid,setNewToken,token,isTokenExpired,setExpiredMsg,isTokenPresent} = useContext(TokenContext);
  const navigate = useNavigate();
  const {show,variant} = useContext(ToastContext);
  
    
        

  
  return (
    <div key={location.pathname}  className="d-flex flex-column    justify-content-start "  style={{ height: "82lvh"}} >
      <ToastTemplate show={show} color={variant.color} headerText={variant.headerText} bodyText={variant.bodyText} ></ToastTemplate>
      {/* Aquí renderizamos el contenido dinámicamente usando Outlet */}
      <Outlet 
       />
    </div>
  );
}

export default Content;

