import React from "react";
import { Link, useParams } from "react-router-dom"; // Hook para obtener el parámetro de la URL
import TopicCard from "../components/TopicCard"; // Componente para mostrar los temas
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Topics = () => {
  const { subjectId } = useParams(); // Obtener el subjectId de la URL

  // Función para obtener los temas
  const getTopics = async () => {

    const response = await axios.get("http://localhost:3000/topics");
    return response.data;
  };

  // Query para obtener los temas
  const { isLoading, data, error } = useQuery({
    queryKey: ["topics", subjectId], // Añadimos subjectId a la clave para caching eficiente
    queryFn: getTopics,
  });

  // Filtramos los temas solo si los datos han sido cargados
  const filteredTopics = data ? data.filter(topic => topic.subjectId === subjectId) : [];

 
  if (isLoading) return <div>Cargando...</div>;
  if(filteredTopics.length === 0) return <div>Todavia no hay temas para esta asignatura</div>
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div className="bg-white">
      <h2 className="p-1">Temas de la Asignatura</h2>
      <div className="bg-white d-flex overflow-auto flex-column flex-wrap">
        {filteredTopics.map(topic => (
          <Link key={topic.id} to={`/topics/${subjectId}/files/${topic.id}`} className="text-decoration-none">
            <TopicCard name={topic.name} description={topic.description} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topics;
