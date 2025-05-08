import React from 'react';
import { FaBook, FaFileAlt, FaReact , FaFilePdf , FaFileImage } from "react-icons/fa";
function FileIcon({ contentType }) {
    const indexOfDot = contentType.indexOf(".");
  const fileType = contentType ? contentType.substring(indexOfDot +1 ) : ''; // extrae la parte después de 'application/'
    console.log(fileType);
  let icon;

  // Usar un switch o condicional para seleccionar el ícono según el tipo de archivo
  switch (fileType) {
    case 'pdf':
      icon = <FaFilePdf style={{fontSize:"20px"}} color='red'></FaFilePdf>; // Ícono de PDF
      break;
    case 'png':
      icon = <FaFileImage></FaFileImage>; // Ícono de imagen
      break;
    case 'audio':
      icon = <faFileAudio></faFileAudio>; // Ícono de archivo de audio
      break;
    default:
      icon = <FaFileAlt style={{fontSize:"20px"}} className='text-primary' ></FaFileAlt>; // Ícono genérico de archivo
      break;
  }

  return (
    
      icon
  
  );
  // Devuelve el ícono envuelto en un div con estilos   
  icon;
}

export default FileIcon;