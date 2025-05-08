import React from "react";
import ThreeDots from "./threedots";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaBook, FaReact } from "react-icons/fa";
import SimpleIconButton from "./SimpleIconButton";
function FileCard({  name, size,createdAt, contentType, }) {
  //Definición de estilos para la TopicCard
  const cardstyle = {
    height: "100px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  };

  return (
   <div
      className="d-flex align-items-center justify-content-between rounded-4 resource bg-white gap-3 w-75"
      style={cardstyle}
    >
     
        <div className="d-flex flex-row flex-nowrap align-items-center justify-content-between">
         
            <div className="bg-primary d-flex justify-content-center  rounded-5 p-2">
              <FaBook size={"20px"} color="white" />
            </div>
            
              <h5 className=" align-self-start">{name}</h5>
              <p>{size} bytes</p>
              <p>{createdAt}</p>
            
          
        </div>
      
      <SimpleIconButton  icon={"bi bi-file-earmark"} color={"black"} onClick={() => handleOpenFile(file.id)}></SimpleIconButton>
      <SimpleIconButton icon={"bi bi-trash"} color={"red"} onClick={() => handleDeleteFile(file.id)} />
      <>
        <ThreeDots
          resourceId={name}
          stylesClass={"text-black"}
          resourceType={"file"}
        ></ThreeDots>
        
      </>
    </div>

  
  );
}

export default FileCard;
