import React from "react";
import Filetable from "../pages/FileTable";
import Storagebar from "../components/StorageBar";
import { useQuery } from "@tanstack/react-query";
import { useFiles } from "../hooks/UseResources";
import TokenContext from "../context/AuthContext";
import { useContext } from "react";
import { use } from "react";
import { useEffect } from "react";
import HeaderContext from "../context/HeaderContext"; // Importar el contexto del encabezado
import NoContentPage from "./NoContentPage";
import LoadingPage from "./Loading";
// Página de Almacenamiento
const Storage = () => {
 const {isTokenValid} = useContext(TokenContext);
  const {getAllFiles} = useFiles(); // Hook para manejar archivos
  const {setTitle,setPageType} = useContext(HeaderContext); // Extraer el contexto del encabezado
  useEffect(() => {
    setTitle("Almacenamiento"); // Establecer el título del encabezado
    setPageType(null); // Establecer el tipo de página para el encabezado
  }
  , []);
   const {isLoading,error,data} = useQuery({
     queryKey:  ["files"],
     queryFn:getAllFiles,
   });

   if(isLoading) return <LoadingPage></LoadingPage>; // Mostrar mensaje de carga
   if(error) return <div>Error: {error.message}</div>; // Mostrar mensaje de error
   if(!data || data.length === 0) return <NoContentPage message={"Crea una asignatura, un tema y añade algun archivo asociado"} title={"No existen archivos "}></NoContentPage>; // Mostrar mensaje si no hay archivos
   return(
      // Contenedor principal de la página de almacenamiento
    <div >
  
        <div>
      {/*Usamos el componente Storagebar que muestra la barra cargada segun el almacenamiento usado*/ }
        <Storagebar files= {data} ></Storagebar>
        </div>
        <div className="" style={{ height: "80vh"}}>
          {/*Usamos el componente Filetable que muestra una lista de archivos*/ }
        <Filetable files={data}></Filetable>
        </div>
        
        </div>
   );
    
    
};

export default Storage;
