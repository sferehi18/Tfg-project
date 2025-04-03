import React from "react";
import { Button } from "react-bootstrap";
import ThreeDots from "./threedots";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useSubjects } from "../hooks/UseResources";
import SimpleIconButton from "./SimpleIconButton";
import { useState } from "react";
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
  

  //Estilos personalizados
  const cardstyle = {
    width: "16rem",

    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    margin: "10px",
    height: "fit-content",
  };

  return (
    //Contenedor de Asignaturas
    <div className="card rounded-3 p-1 resource" style={cardstyle}>
      <img
        src="src\assets\defaultBlue.jpg"
        style={{ height: "10rem" }}
        className="card-img-top"
        alt="..."
      ></img>
      <div className="card-body  ">
        <div className="d-flex justify-content-between mb-1">
          {/*Botón con link a sus temas */}
          <Link to={`/subject/${id}/topics`} className="text-decoration-none ">
            <Button>Ver temas</Button>
          </Link>
          {/*Botón que abre un menu con opciones de eliminación o edición de un recurso concreto*/}
          <div className="d-flex flex-nowrap align-items-center">
          <SimpleIconButton color={"red"}
            icon={isFavorite ? "bi bi-heart-fill" : "bi bi-heart"}
            onClick={() => toggleIsFavorite(id, !isFavorite)}
          />
          <ThreeDots
            className=""
            resourceId={id}
            resourceType={"subject"}
          ></ThreeDots>
           
          </div>
          
        </div>

        {/*Datos de la asignatura*/}
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          Marcar como favorito:
         
        </p>
      </div>
    </div>
  );
}

export default Subjectcard;
