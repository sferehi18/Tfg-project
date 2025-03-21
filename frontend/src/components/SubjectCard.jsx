import React from "react";

function Subjectcard({id,name,onClick}){
  const cardstyle = {
        width: '16rem',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        margin: '10px',
        height: 'fit-content',
        padding: '5px'
  };

    return(
    <div className="card" style={cardstyle} onClick={onClick}>
      
      <img src="public\images\default_image.png" className="card-img-top" alt="..."></img>
  <div className="card-body d-flex flex-column">
  <p className="card-text align-self-end"> <i className="bi bi-three-dots-vertical"></i></p>
    <h5 className="card-title">{name}</h5>
    <p className="card-text">Id de asignatura: {id}</p>
    
    
  </div>
      
  
</div>





    );
}

export default Subjectcard;