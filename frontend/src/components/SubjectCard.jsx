import React from "react";
import { Button } from "react-bootstrap";
import ThreeDots from "./threedots";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useSubjects } from "../hooks/UseResources";
import SimpleIconButton from "./SimpleIconButton";
import { useState } from "react";
import TooltipTitle from "./tooltipTitle";
/*Componente SubjectCard
  -Renderiza cada Asignatura segun sus datos en la estructura definida
  -Contiene un boton enlace a sus temas y un boton con icono (tres puntos) para la edición o eliminación de un recurso

*/
function Subjectcard({ id, name, isFav }) {
  const [isFavorite, setIsFavorite] = useState(isFav); // Estado para marcar como favorito
  const { handleMarkAsFavorite } = useSubjects();
  
  const toggleIsFavorite = (id, newFavoriteState) => {
    setIsFavorite(newFavoriteState); 
    handleMarkAsFavorite(id, newFavoriteState);
  };
  
   const formattedName = name.length > 15 ? name.slice(0, 10) + "..." : name; // Formateo del nombre para que no exceda el tamaño
  //Estilos personalizados
  const cardstyle = {
   
 
    margin: "10px",
    
  };

  return (
    //Contenedor de Asignatura
    <div className="subjectCard d-flex flex-column align-items-center justify-content-end gap-2  rounded-4  resource  " style={cardstyle}>
      
      <div className="mt-4 ms-2">
    <Link to={`/subject/${id}/topics`} className="text-decoration-none   ">
            <SimpleIconButton hover={true} icon={"bi bi-arrow-right"} stylesClass={"text-white fs-4"}></SimpleIconButton>
          </Link>
      
        
    </div>
       
         
           
            <div className="d-flex flex-nowrap align-items-center justify-content-between  w-100 ">
           {formattedName != name ? <TooltipTitle customClasses={" mt-4 ms-2 fs-5"}  text={formattedName} tooltipText={name}></TooltipTitle>
           : <p className=" mt-4 ms-2 fs-5">{formattedName}</p>} 
            <div className=" align-self-end  d-flex  flex-nowrap align-items-center gap-1">
          <SimpleIconButton stylesClass={ isFavorite ? "color-gold" : "color-grey"} hover={true} animationClass={isFavorite ? "pulse" : ""} 
            icon={isFavorite ? "bi bi-bookmark-fill" : "bi bi-bookmark"}
            onClick={() => toggleIsFavorite(id, !isFavorite)}
            
          />
          <ThreeDots
            className=""
            resourceId={id}
            resourceType={"subject"}
          ></ThreeDots>
           
          </div>
            </div>
        
         
          {/*Botón que abre un menu con opciones de eliminación o edición de un recurso concreto*/}
          
          
        
    
       
      </div>
    
  );
}

export default Subjectcard;
