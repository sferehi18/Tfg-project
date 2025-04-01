import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spinner } from "react-bootstrap";
const getFiles = async () =>{
  const response = await axios.get("http://localhost:3000/files");
  return response.data; 
}

function Filetable() {
  const {isLoading,error,data} = useQuery({
    queryKey:  ["files"],
    queryFn: getFiles,
  });

  const { subjectId, topicId } = useParams(); // Extraer subjectId y topicId de la URL

  


  return (
 
      
      <table className="table bg-primary">
        <thead>
          <tr>
            <th >ID</th>
            <th >Nombre</th>
            <th >Tipo</th>
            <th >Tamaño</th>
            <th >Fecha de Creación</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
        data.map((file) => (
            <tr key={file.id}>
              <th>{file.id}</th>
              <td>{file.name}</td>
              <td>{file.type}</td>
              <td>{file.size}</td>
              <td>{file.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

  );
}

export default Filetable;
