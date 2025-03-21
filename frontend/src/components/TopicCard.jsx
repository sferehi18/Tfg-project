import React from "react";

function Topiccard({description,name,subjectId}){
  
  
  const cardstyle = {
        width: '16rem',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        margin: '10px',
        height: 'fit-content',
        width: '80vw',
        padding: '5px'
  };
 
    return(
    <div className="card" style={cardstyle} >
  <div className="card-body d-flex flex-row flex-nowrap align-items-center justify-content-between ">
    <span> <h5 className="card-title align-self-start">{name}</h5></span>
    <div> <p className="card-text">Descripcion:{description}</p>
    </div>
    <span><i class="bi bi-three-dots-vertical"></i></span>
 
 
   
    
    
  </div>
</div>





    );
}

export default Topiccard;