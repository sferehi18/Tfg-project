import React from "react";
import Filetable from "./FileTable";


function Files(){
    return (
        <div className="contentContainer bg-white overflow-auto rounded-4">
            <h2 className="p-2">Archivos del Tema</h2>
            <Filetable></Filetable>

        </div>
    );
}

export default Files;