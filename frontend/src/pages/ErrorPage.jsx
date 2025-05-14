import React from "react";

// Pagina de error
function ErrorPage({errorMessage, errorTitle}) {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center h
      vh-100">
        
      <h2 className="p-2 mb-4">{errorTitle} <i className="bi bi-emoji-frown-fill text-warning"></i></h2> 
      <h3>{errorMessage}</h3>
      <h4>Porfavor vuelve a intentarlo recargando la página</h4>
      
    </div>
  );
}
export default ErrorPage;