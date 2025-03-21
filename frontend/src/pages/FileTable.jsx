import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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

  
  // Filtrar archivos por subjectId y topicId obtenidos de la URL


  return (
    <div className="w-100">
      <h2 className="p-2">Archivos del Tema {topicId}</h2>
      
      <table className="table bg-primary">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Tipo</th>
            <th scope="col">Tamaño</th>
            <th scope="col">Fecha de Creación</th>
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
    </div>
  );
}

export default Filetable;
