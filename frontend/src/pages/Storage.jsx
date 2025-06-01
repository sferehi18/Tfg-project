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
     enabled: isTokenValid()
   });
   return(
      // Contenedor principal de la página de almacenamiento
    <div >
  
        <div>
      {/*Usamos el componente Storagebar que muestra la barra cargada segun el almacenamiento usado*/ }
        <Storagebar files= {data} ></Storagebar>
        </div>
        <div>
          {/*Usamos el componente Filetable que muestra una lista de archivos*/ }
        <Filetable files={data}></Filetable>
        </div>
        
        </div>
   );
    
    
};

export default Storage;
