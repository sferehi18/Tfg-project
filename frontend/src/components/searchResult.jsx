import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Importamos useLocation para obtener la ubicación actual
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para navegar entre rutas
import TooltipTitle from "./tooltipTitle";
function searchResult({resourceType,resourceId,resourceName,onClick}) {
  
  const formattedName = resourceName.length >= 11 ? resourceName.slice(0,8) + "..." : resourceName;
 
   
  return (
    <button  className=" border-0 w-100" onClick={onClick}>
      <div className="d-flex bg-white  align-items-start gap-2 p-2 rounded-3 border border-1  w-100">
        <p className="text-start">{resourceType}</p>
         { formattedName != resourceName ? 
          <TooltipTitle customClasses="text-start fs-5 " text={formattedName} tooltipText={resourceName}></TooltipTitle>
           :
           <p className="fs-5">{formattedName}</p>}
       
      </div>
    </button>);}

    export default searchResult;