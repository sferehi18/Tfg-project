import React from "react";
import SimpleIconButton from "../components/SimpleIconButton";
import { useFiles } from "../hooks/UseResources";



function Filetable({files}) {
  const {handleDeleteFile} = useFiles(); // Hook para manejar archivos



const handleOpenFile = (fileId) => {
  window.open(`http://localhost:8080/files/${fileId}/open`, "_blank");
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
