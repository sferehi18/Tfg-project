import React from "react";
import Filetable from "./FileTable";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useFiles } from "../hooks/UseResources";
import AddIconButton from "../components/AddIconButton";
import TokenContext from "../context/AuthContext";
import { useContext } from "react";
import { useEffect } from "react";
import HeaderContext from "../context/HeaderContext";
function Files(){
    const {isTokenValid} = useContext(TokenContext);
    const { subjectUri, topicUri} = useParams(); // Extraer subjectId y topicId de la URL
    const [topicId,slug] = topicUri ? topicUri.split("-") : [];
    const navigate = useNavigate();
    const {setTitle,setPageType} = useContext(HeaderContext); // Extraer el contexto del encabezado, aunque no se usa en este componente
     useEffect(() =>{
          if(!slug){ navigate(-1);}else{
            setTitle(`Archivos del Tema ${slug}`); // Establecer el título del encabezado
            setPageType("file"); // Establecer el tipo de página para el encabezado
          }

          
       },[])
    
    const {getFiles} = useFiles(); // Hook para manejar archivos
     const {isLoading,error,data} = useQuery({
       queryKey:  ["files"],
       queryFn: () => getFiles( topicId ),
       enabled:isTokenValid(),
     });
     if (isLoading) return <div>Cargando...</div>;
     if (error) return <div>Error: {error.message}</div>;
    return (
        <div  style={{ height: "82vh"}}>
        
           
            
            {data && <Filetable files={data}></Filetable>}

        </div>
    );
}

export default Files;