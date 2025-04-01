import React from "react";
import Filetable from "../pages/FileTable";
import Storagebar from "../components/storageBar";
// Página de Almacenamiento
const Storage = () => {
   
   return(
      // Contenedor principal de la página de almacenamiento
    <div className="bg-white d-flex overflow-auto flex-column flex-wrap rounded-4 contentContainer">
        <h2 className="p-3"><i className="bi bi-cloud p-1"></i>Almacenamiento</h2>
        <div>
      {/*Usamos el componente Storagebar que muestra la barra cargada segun el almacenamiento usado*/ }
        <Storagebar></Storagebar>
        </div>
        <div>
          {/*Usamos el componente Filetable que muestra una lista de archivos*/ }
        <Filetable></Filetable>
        </div>
        
        </div>
   );
    
    
};

export default Storage;
