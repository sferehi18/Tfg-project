import React from "react"; // Permite escribir JSX (mezcla de JavaScript y HTML en React)
import { useParams } from "react-router-dom"; // Hook para obtener parámetros de la URL
import TopicCard from "../components/TopicCard"; // Componente para mostrar los temas individuales
import { useQuery } from "@tanstack/react-query"; // Hook para manejar consultas asíncronas (fetching de datos)
import axios from "axios"; // Librería para hacer peticiones HTTP
import { useTopics } from "../hooks/UseResources"; // Hook personalizado que maneja la obtención de temas
import LoadingPage from "./Loading"; // Componente para mostrar una pantalla de carga
import AddIconButton from "../components/AddIconButton";

// Componente que muestra los temas de una asignatura específica
const Topics = () => {
  const { subjectId } = useParams(); // Extrae el "subjectId" desde la URL (ejemplo: /subjects/123)
  const { getTopics } = useTopics(); // Usa el hook personalizado para obtener la función de consulta de temas

  // Usa useQuery para obtener los temas desde el backend
  const { isLoading, data, error } = useQuery({
    queryKey: ["topics"], // Clave única para caché y revalidación de datos
    queryFn:() => getTopics(subjectId), // Función que obtiene los temas desde el backend
  });

 

  // Si los datos están cargando, muestra una pantalla de carga
  if (isLoading) return <LoadingPage></LoadingPage>;

  // Si no hay temas para esta asignatura, muestra un mensaje informativo
 

  // Si ocurre un error en la consulta, muestra el mensaje de error
  if (error) return <div className="contentContainer">Error: {error.message}</div>;
  
  return (
    <>
      <div className="d-flex align-items-center ">
      <h2 className="p-3">Temas de la Asignatura</h2>
      <AddIconButton
        subjectId={subjectId} // ID de la asignatura para la que se están mostrando los temas
        resourceType={"topic"} // Tipo de recurso (tema)
        icon={"bi bi-plus-lg"} // Icono del botón
        stylesClass={"addicon  d-flex justify-content-center align-items-center rounded-5"} // Clase de estilos del botón
        />
        
        </div> {/* Título de la sección */}

      {/* Contenedor para los temas */}
      <div className="bg-white d-flex overflow-auto flex-column flex-wrap contentContainer ">
        { data && data.map(topic => (
          // Renderiza una tarjeta para cada tema
          <TopicCard  
            key={topic.name} 
            name={topic.name} 
            description={topic.description} 
            subjectId={subjectId} 
            topicId={topic.id} 
          />
        ))}
      </div>
    </>
  );
};

export default Topics; // Exporta el componente para su uso en otras partes de la aplicación
