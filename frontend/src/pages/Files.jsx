import React from "react";
import Filetable from "./FileTable";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useFiles } from "../hooks/UseResources";
import AddIconButton from "../components/AddIconButton";
function Files(){
  
    const { subjectId, topicId } = useParams(); // Extraer subjectId y topicId de la URL
    const {getFiles} = useFiles(); // Hook para manejar archivos
     const {isLoading,error,data} = useQuery({
       queryKey:  ["files"],
       queryFn: () => getFiles(topicId),
     });
     if (isLoading) return <div>Cargando...</div>;
     if (error) return <div>Error: {error.message}</div>;
    return (
        <div  style={{ height: "82vh"}}>
            <div className="d-flex align-items-center">
            <h2 className="p-2">Archivos del Tema</h2>
            <AddIconButton
        
        icon={"bi bi-plus-lg"} // Icono del botón
        stylesClass={"addicon  d-flex justify-content-center align-items-center rounded-5"}
        resourceType={"file"} // Clase de estilos del botón
        />
            </div>
           
            
            {data && <Filetable files={data}></Filetable>}

        </div>
    );
}

export default Files;