import React from "react";
import ThreeDots from "./threedots";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
function Topiccard({description,name,subjectId,topicId}){
  
  
  const cardstyle = {
        width: '16rem',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        margin: '10px',
        height: 'fit-content',
        width: '80vw',
        padding: '5px'
  };
 
    return(
    <div className="card rounded-2" style={cardstyle} >
  <div className="card-body d-flex flex-row flex-nowrap align-items-center justify-content-between ">
    <span> <h5 className="card-title align-self-start">{name}</h5></span>
    <div> <p className="card-text">Descripcion:{description}</p>
   
    </div>
    <div className="d-flex gap-2">
    <Link  to={`/topics/${subjectId}/files/${topicId}`} className="text-decoration-none ">
    <Button>Ver archivos</Button>
    </Link>
    <ThreeDots resourceId={name+topicId}></ThreeDots>
    </div>
   
  </div>
</div>





    );
}

export default Topiccard;