import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom"; // Usamos Outlet para renderizar rutas hijas
import { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Importamos useLocation para obtener la ubicación actual
import TokenContext from "../context/AuthContext";
function Content() {
  const location = useLocation();
  const {isTokenValid,setNewToken,token,isTokenExpired,setExpiredMsg,isTokenPresent} = useContext(TokenContext);
  const navigate = useNavigate();
  useEffect(() => {
    console.log('La ubicación ha cambiado:', location);
    if(isTokenPresent()){
      if(isTokenExpired()){
      navigate("/login");
      
      setExpiredMsg("Tu token ha expirado porfavor vuelve a iniciar Sesion");
        }
    }
    
        
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

