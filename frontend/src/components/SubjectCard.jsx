import React from "react";
import { Button } from "react-bootstrap";
import ThreeDots from "./threedots";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {useSubjects} from "../hooks/UseResources";
/*Componente SubjectCard
  -Renderiza cada Asignatura segun sus datos en la estructura definida
  -Contiene un boton enlace a sus temas y un boton con icono (tres puntos) para la edición o eliminación de un recurso

*/
function Subjectcard({subjectId,name}){
  
  
//Estilos personalizados
  const cardstyle = {
        width: '16rem',
        
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        margin: '10px',
        height: 'fit-content',
      
  };


    return(
      //Contenedor de Asignaturas 
    <div className="card rounded-3 p-1 resource" style={cardstyle}>
      
      <img src="src\assets\defaultBlue.jpg" style={{height:'10rem'}} className="card-img-top" alt="..."></img>
  <div className="card-body  ">
   <div className="d-flex justify-content-between mb-1">
    {/*Botón con link a sus temas */}
   <Link to={`/subject/${subjectId}/topics`}   className="text-decoration-none ">
  <Button>Ver temas</Button>
  </Link>
      {/*Botón que abre un menu con opciones de eliminación o edición de un recurso concreto*/}
  <ThreeDots className="" resourceId={subjectId} resourceType={"subject"} ></ThreeDots>
   </div>
  
    {/*Datos de la asignatura*/}
   <h5 className="card-title">{name}</h5>
    <p className="card-text">Id de asignatura: {subjectId}</p>
    
    
  </div>
      
  
</div>





    );
}

export default Subjectcard;