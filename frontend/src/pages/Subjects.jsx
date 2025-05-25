import React from "react"; // Permite escribir JSX
import SubjectCard from "../components/SubjectCard";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "react-bootstrap";
import {useSubjects} from "../hooks/UseResources";
import LoadingPage from "./Loading";
import AddIconButton from "../components/AddIconButton";
import { useEffect, useContext } from "react";
import TokenContext from "../context/AuthContext"; // Importamos el contexto de autenticación
import ErrorPage from "./ErrorPage";
import { redirect, useNavigate } from "react-router-dom"; // Importamos useNavigate para navegar entre rutas
import { useTopics } from "../hooks/UseResources";
import { QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient();

const Subjects = () => {
  // Obtenemos el token y la función para actualizarlo desde el contexto de autenticación
  const {isTokenValid} = useContext(TokenContext);
   // Inicializamos el hook useNavigate
 
 const { getAllTopics } = useTopics();
  // Obtenemos la función getSubjects desde un custom hook
  const { getSubjects } = useSubjects();
  const {} = useQuery({
    queryKey: ["topics"], // Clave única para caché y revalidación de datos
    queryFn:getAllTopics,
    enabled: isTokenValid()
// Función que obtiene los temas desde el backend
  });
  

  // Usamos React Query para hacer la petición a la API y manejar loading/error/data automáticamente
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["subjects"], // Clave para caché y refetching
    queryFn: getSubjects,
    enabled: isTokenValid()
     
      // Función que realiza la consulta
  });
  
  
  // Mientras se cargan los datos, mostramos una página de carga
  if (isLoading) {
    return <LoadingPage />;
  }

  // Si ocurre un error en la consulta, mostramos el mensaje
  if (isError) {
     // Redirige a la página de login si hay un error
    return <ErrorPage errorTitle={error.message} errorMessage={"Ha ocurrido un problema al cargar tus asignaturas"} />;
  }

  // Render principal de la página de asignaturas
  return (
    <div style={{ height: "82vh" }}>
      {/* Título y botón para añadir asignaturas */}
      <div className="d-flex align-items-center">
        <h2 className="p-3">Asignaturas</h2>
        <AddIconButton
          icon={"bi bi-plus-lg"}
          stylesClass={"addicon"}
          resourceType={"subject"} //Este valor se pasa al modal para saber qué tipo de recurso se va a crear
        />
      </div>

      {/* Renderizamos la lista de asignaturas en tarjetas */}
      <div className="d-flex rounded-4 flex-row flex-wrap align-items-start" style={{ height: "100%", overflowY: "auto" }}>
        {data && data.map((subject) => (
          <SubjectCard
            key={subject.id}
            id={subject.id}
            name={subject.name}
            isFav={subject.isFav == 0 ? false : true}
          />
        ))}
      </div>
    </div>
  );
};


export default Subjects;
