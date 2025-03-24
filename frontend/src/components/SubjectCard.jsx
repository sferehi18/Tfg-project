import React from "react";
import { Button } from "react-bootstrap";
import ThreeDots from "./threedots";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useSubjects from "../hooks/UseSubjects";
function Subjectcard({subjectId,name}){

  const cardstyle = {
        width: '16rem',
        
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        margin: '10px',
        height: 'fit-content',
      
  };


    return(
    <div className="card rounded-3 p-1 resource" style={cardstyle}>
      
      <img src="src\assets\defaultBlue.jpg" style={{height:'10rem'}} className="card-img-top" alt="..."></img>
  <div className="card-body  ">
   <div className="d-flex justify-content-between mb-1">
   <Link to={`/subject/${subjectId}/topics`}   className="text-decoration-none ">
  <Button>Ver temas</Button>
  </Link>

  <ThreeDots className="" resourceId={subjectId} resourceType={"subjects"}></ThreeDots>
   </div>
  
    
   <h5 className="card-title">{name}</h5>
    <p className="card-text">Id de asignatura: {subjectId}</p>
    
    
  </div>
      
  
</div>





    );
}

export default Subjectcard;