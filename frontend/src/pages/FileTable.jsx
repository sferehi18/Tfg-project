import React from "react";
import SimpleIconButton from "../components/SimpleIconButton";
import { useFiles } from "../hooks/UseResources";
import axios from "axios";

import FileIcon from "../components/FileIcon"; // Asegúrate de que la ruta sea correcta

function Filetable({files}) {
  const {handleDeleteFile} = useFiles(); // Hook para manejar archivos

  const authHeaders = { 
    "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
  
  }

const handleOpenFile = (fileId) => {
  axios.get(`http://localhost:8080/files/${fileId}/open`, {
    headers: authHeaders,
  })
    .then((response) => {
      const fileUrl = response.data.fileUrl; // Asegúrate de que la respuesta contenga la URL del archivo
      window.open(fileUrl, "_blank"); // Abre el archivo en una nueva pestaña
    });
 
} 


 


  return (
 
      <div className="overflow-y-auto" style={{ height: "100%" }}>
        <table className="table rounded-4 table-striped table-light table-hover table-responsive ">
        <thead className="rounded-4 ">
          <tr>
            <th ></th>
            <th >Nombre</th>
        
            <th >Tamaño</th>
            <th >Fecha de Creación</th>
            <th ></th>
            <th ></th>
          </tr>
        </thead>
        <tbody>
          {files &&
        files.map((file) => (
            <tr key={file.id} >
              
              <td>
              <FileIcon contentType={file.name}></FileIcon>
              </td>
              <td>{file.name}</td>
             
              <td>{file.size}</td>
              <td>{file.created_at}</td>
              <td>
               <div style={{width:"fit-content"}} className="d-flex p-2 rounded-2 bg-danger bg-opacity-25 align-items-center "><SimpleIconButton icon={"bi bi-trash"} hover={false} color={"red"} onClick={() => handleDeleteFile(file.id)} /></div> </td>
              
              <td><div style={{width:"fit-content"}} className="d-flex p-2 rounded-2 bg-primary bg-opacity-25 align-items-center" ><SimpleIconButton icon={"bi bi-eye"} hover={false} color={"black"} onClick={() => handleOpenFile(file.id)} /></div></td>

            </tr>
          ))}
        </tbody>
      </table>
      </div>
      

  );
}

export default Filetable;
