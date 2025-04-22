import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';

function FileUploader({ topicId,onFileSelect }) {
  const fileInputRef = useRef(null);
    
  const handleClick = () => {
    fileInputRef.current.click(); // Abre el diálogo de archivos
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && onFileSelect) {
      onFileSelect({id: topicId, newFile: file });
    }
  };

  return (
   
   
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }} // Oculta el input
      />
 
  );
}

export default FileUploader;
