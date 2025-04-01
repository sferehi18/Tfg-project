import React from "react"; // Importa React correctamente 
import { Spinner } from "react-bootstrap"; // Importa el componente Spinner de React-Bootstrap

// Componente que muestra una pantalla de carga con un spinner centrado
function LoadingPage() {
  return (
    <div className="bg-white d-flex justify-content-center align-items-center contentContainer rounded-4" style={{ height: "100vh" }}>
      <Spinner animation="border" variant="primary" />
    </div>
  );
}

export default LoadingPage; // Exporta el componente para su uso en otras partes de la aplicación
