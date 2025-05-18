import React from "react";
import Filetable from "../pages/FileTable";
import Storagebar from "../components/StorageBar";
import { useQuery } from "@tanstack/react-query";
import { useFiles } from "../hooks/UseResources";
import TokenContext from "../context/AuthContext";
import { useContext } from "react";
// Página de Almacenamiento
const Storage = () => {
 const {isTokenValid} = useContext(TokenContext);
  const {getAllFiles} = useFiles(); // Hook para manejar archivos
   const {isLoading,error,data} = useQuery({
     queryKey:  ["files"],
     queryFn:getAllFiles,
     enabled: isTokenValid()
   });
   return(
      // Contenedor principal de la página de almacenamiento
    <div >
        <h2 className="p-3"><i className="bi bi-cloud p-1"></i>Almacenamiento</h2>
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
