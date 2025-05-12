import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Importamos useLocation para obtener la ubicación actual
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para navegar entre rutas
function searchResult({resourceType,resourceId,resourceName,onClick}) {
  const navigate = useNavigate(); // Inicializamos el hook useNavigate
  const location = useLocation();
  useEffect(() => {
    console.log("La ubicación ha cambiado:", location);
  }, [location]);

   
  return (
    <button className=" border-0 w-100" onClick={onClick}>
      <div className="d-flex bg-white  align-items-start gap-2 p-2 rounded-3 border border-1  w-100">
        <p className="text-start">{resourceType}</p>
         <h5 className="text-start">{resourceName}</h5>
       
      </div>
    </button>);}

    export default searchResult;