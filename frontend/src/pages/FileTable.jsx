import React from "react";
import SimpleIconButton from "../components/SimpleIconButton";
import { useFiles } from "../hooks/UseResources";
import axios from "axios";

import FileIcon from "../components/FileIcon"; // Asegúrate de que la ruta sea correcta

function Filetable({ files }) {
  // Desestructura la función handleDeleteFile del hook useFiles, la cual maneja la eliminación de archivos
  const { handleDeleteFile } = useFiles(); 

  // Cabeceras de autenticación, incluyendo el token de usuario para las solicitudes API
  const authHeaders = { 
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}` // Se obtiene el token JWT del almacenamiento local
  }

  

  // Función para abrir un archivo en una nueva pestaña del navegador
  const handleOpenFile = (fileId) => {
    // Realiza una solicitud GET para obtener el archivo como un blob (contenido binario)
    axios.get(`http://localhost:8080/files/${fileId}/open`, {
      headers: authHeaders, // Enviar cabeceras de autenticación
      responseType: 'blob' // Especifica que la respuesta será un blob (archivo binario)
    })
      .then((response) => {
        // Crea un objeto Blob a partir de los datos binarios recibidos
        const file = new Blob([response.data], { type: response.headers['content-type'] });
        // Crea una URL temporal para el archivo Blob
        const fileURL = URL.createObjectURL(file);
        // Abre el archivo en una nueva pestaña del navegador
        window.open(fileURL, "_blank");
      })
      .catch((error) => {
        // Maneja errores si la solicitud o procesamiento del archivo falla
        console.error("Error al abrir el archivo:", error);
      });
  }

  return (
    <div className="overflow-y-auto" style={{ height: "100%" }}>
      <table className="table rounded-4 table-striped table-light table-hover table-responsive">
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
          {files && // Comprueba si hay archivos para mostrar
            files.map((file) => (
              <tr key={file.id}>
                <td>
                  <FileIcon contentType={file.name}></FileIcon> {/* Muestra un icono basado en el tipo de archivo */}
                </td>
                <td>{file.name}</td>
                <td>{file.size}</td>
                <td>{file.created_at}</td>
                <td>
                  {/* Botón para eliminar el archivo */}
                  <div style={{ width: "fit-content", cursor:"pointer" }}  className="d-flex p-2 rounded-2 bg-danger bg-opacity-25 align-items-center bg-red-light">
                    <SimpleIconButton icon={"bi bi-trash"} hover={false} color={"red"} onClick={() => handleDeleteFile(file.id)} />
                  </div>
                </td>
                <td>
                  {/* Botón para abrir el archivo en una nueva pestaña */}
                  <div style={{ width: "fit-content",cursor: "pointer"}} className="d-flex p-2 rounded-2 bg-primary bg-opacity-25 align-items-center bg-blue-light">
                    <SimpleIconButton icon={"bi bi-eye"} hover={false} color={"black"} onClick={() => handleOpenFile(file.id)} />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Filetable;
