import React from "react"; // Permite escribir JSX (mezcla de JavaScript y HTML en React)
import { useParams } from "react-router-dom"; // Hook para obtener parámetros de la URL
import TopicCard from "../components/TopicCard"; // Componente para mostrar los temas individuales
import { useQuery } from "@tanstack/react-query"; // Hook para manejar consultas asíncronas (fetching de datos)
import axios from "axios"; // Librería para hacer peticiones HTTP
import { useTopics } from "../hooks/UseResources"; // Hook personalizado que maneja la obtención de temas
import LoadingPage from "./Loading"; // Componente para mostrar una pantalla de carga
import AddIconButton from "../components/AddIconButton";
import ErrorPage from "./ErrorPage";
import { useContext } from "react";
import TokenContext from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderContext from "../context/HeaderContext"; // Contexto para manejar el título de la página
import SearchBar from "../components/SearchBar"; // Componente de búsqueda para filtrar temas
import NoContentPage from "./NoContentPage";
import { AnimatePresence } from "framer-motion";
// Componente que muestra los temas de una asignatura específica
const Topics = () => {
     const {title,setTitle,setPageType} = useContext(HeaderContext);

  const { subjectUri } = useParams(); // Extrae el "subjectId" desde la URL (ejemplo: /subjects/123)
const [subjectId, slug] = subjectUri.split("-");


 useEffect(()=>{
 setTitle("Temas de " + slug);
setPageType("topic");
 },[])
  const { getTopics } = useTopics(); // Usa el hook personalizado para obtener la función de consulta de temas
   const {isTokenValid} = useContext(TokenContext);
   const navigate = useNavigate();
   useEffect(() =>{
      if(!slug) navigate(-1)
   },[])

 
  // Usa useQuery para obtener los temas desde el backend
  const { isLoading, data, error } = useQuery({
    queryKey: ["topics"], // Clave única para caché y revalidación de datos
    queryFn:() => getTopics(subjectId),
// Función que obtiene los temas desde el backend
  });

 

  // Si los datos están cargando, muestra una pantalla de carga
  if (isLoading) return <LoadingPage></LoadingPage>;

  // Si no hay temas para esta asignatura, muestra un mensaje informativo

  
 

  // Si ocurre un error en la consulta, muestra el mensaje de error
  if (error) return <ErrorPage errorTitle={error.message} errorMessage={"Ha ocurrido un problema al cargar tus asignaturas"} />;
  

 
  return (
    <>
   

      {/* Contenedor para los temas */}
      <div className=" d-flex overflow-y-auto align-items-center  flex-column  rounded-3 " style={{ height: "100%"}} >
          <AnimatePresence>
             { data && data.length != 0 ?  data.map(topic => (
          // Renderiza una tarjeta para cada tema
        
          <TopicCard  
            key={topic.name} 
            name={topic.name} 
            description={topic.description} 
            subjectId={subjectId} 
            topicId={topic.id} 
          />
        )) : <NoContentPage title={"Aún no existen temas en esta asignatura"}  message={"¡Completa tu Asignatura!"}></NoContentPage>}
          </AnimatePresence>
       
      </div>
    </>
  );
};

export default Topics; // Exporta el componente para su uso en otras partes de la aplicación
