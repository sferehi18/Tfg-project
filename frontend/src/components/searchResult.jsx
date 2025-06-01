import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Importamos useLocation para obtener la ubicación actual
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para navegar entre rutas
import TooltipTitle from "./tooltipTitle";
import { FaBookOpen,FaBook } from "react-icons/fa6";
import { FaBookQuran } from "react-icons/fa6";
import { FaFile } from "react-icons/fa6";
function searchResult({resourceType,resourceId,resourceName,onClick}) {
  
  const formattedName = resourceName.length >= 11 ? resourceName.slice(0,8) + "..." : resourceName;
  const resorceIcon = resourceType == "Asignatura" ?  
  <span className="bg-primar d-flex justify-content-center   rounded-3 p-1 ">
                      <FaBookOpen size={"20px"} color="white" />
                     
                    </span> : resourceType == "Temas" ? <span className="bg-primar d-flex justify-content-start   rounded-3 p-1 ">
                      <FaBook size={"20px"} color="white" />
                     
                    </span> : <span className="bg-primar d-flex justify-content-start   rounded-3 p-1 ">
                      <FaFile size={"20px"} color="white" />
                      </span>; 
   
  return (
    <button  className=" border-0 w-100" onClick={onClick}>
      <div className="d-flex bg-white flex-nowrap  align-items-center gap-2 p-1 rounded-3 border   w-100">
        <div className="  d-flex align-items-center gap-2 justify-content-center ">
          {resorceIcon}
          <p className="fs-6">{resourceType}</p></div>
         { formattedName != resourceName ? 
          <TooltipTitle customClasses="text-start fs-5 " text={formattedName} tooltipText={resourceName}></TooltipTitle>
           :
           <div> <p className="fs-5">{formattedName}</p></div>
          }
       
      </div>
    </button>);}

    export default searchResult;