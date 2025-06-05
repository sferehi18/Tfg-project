import React from "react";
import SimpleIconButton from "../components/SimpleIconButton";
import { useFiles } from "../hooks/UseResources";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

import FileIcon from "../components/FileIcon"; // Asegúrate de que la ruta sea correcta


function Filetable({ files }) {
  // Desestructura la función handleDeleteFile del hook useFiles, la cual maneja la eliminación de archivos
  const { handleDeleteFile ,handleOpenFile} = useFiles(); 

 

  

  return (
    <div className="overflow-y-auto mt-3" style={{ height: "100%" }}>
      <table className="table rounded-4 table-striped table-hover table-responsive">
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
        
        <tbody className="fade-transition">
           <AnimatePresence>
          {files && // Comprueba si hay archivos para mostrar
          
            files.map((file) => (
             
                <motion.tr     key={file.id}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.5 }}>
                
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
              </motion.tr>
              
              
            ))}
            </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}

export default Filetable;
