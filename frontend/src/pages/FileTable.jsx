import React from "react";
import SimpleIconButton from "../components/SimpleIconButton";
import { useFiles } from "../hooks/UseResources";
import axios from "axios";



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
 
      
      <table className="table table-striped table-hover  table-sm">
        <thead>
          <tr>
          
            <th >Nombre</th>
        
            <th >Tamaño</th>
            <th >Fecha de Creación</th>
          </tr>
        </thead>
        <tbody>
          {files &&
        files.map((file) => (
            <tr key={file.id} >
           
              <td>{file.name}</td>
             
              <td>{file.size}</td>
              <td>{file.created_at}</td>
              <td><SimpleIconButton icon={"bi bi-file-earmark"} color={"black"} onClick={() => handleOpenFile(file.id)} /></td>
              <td><SimpleIconButton icon={"bi bi-trash"} color={"red"} onClick={() => handleDeleteFile(file.id)} /></td>

            </tr>
          ))}
        </tbody>
      </table>

  );
}

export default Filetable;
