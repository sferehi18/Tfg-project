import React from "react";
import ThreeDots from "./threedots";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
function TopicCard({description,name,subjectId,topicId}){
  
  //Definición de estilos para la TopicCard
  const cardstyle = {
        width: '16rem',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        margin: '10px',
        height: 'fit-content',
        width: '80vw',
        padding: '5px'
  };
 
    return(
      //Estructura de la topicCard , todos los temas se mostrarán segun la misma en el componente Topic.jsx
    <div className="card rounded-2 resource" style={cardstyle} >
  <div className="card-body d-flex flex-row flex-nowrap align-items-center justify-content-between ">
    <span> <h5 className="card-title align-self-start">{name}</h5></span>
    <div> <p className="card-text">Descripcion:{description}</p>
   
    </div>
    <div className="d-flex gap-2">
      {/*Cada tema tendra un boton de enlace a sus archivos  */}
    <Link  to={`/topics/${subjectId}/files/${topicId}`} className="text-decoration-none ">
    <Button>Ver archivos</Button>
    </Link>
    {/*Cada tema tendra un boton de edición al que se le pasara como prop el nombre e id del mismo para asi asociarlo correctamente
    a un recurso concreto */}
    <ThreeDots resourceId={topicId} resourceType={"topic"}></ThreeDots>
    </div>
   
  </div>
</div>





    );
}

export default TopicCard;