import React from "react";
import Filetable from "../pages/FileTable";
import Storagebar from "../components/storageBar";
const Storage = () => {
   return(
    <div className="bg-white d-flex overflow-auto flex-column flex-wrap rounded-4 contentContainer">
        <h2 className="p-3"><i className="bi bi-cloud p-1"></i>Almacenamiento</h2>
        <div>
   
        <Storagebar></Storagebar>
        </div>
        <div>
        <Filetable></Filetable>
        </div>
        
        </div>
   );
    
    
};

export default Storage;
