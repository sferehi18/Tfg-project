import React from "react"; // Permite escribir JSX
import SubjectCard from "../components/SubjectCard";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "react-bootstrap";
import { useSubjects, useUsers } from "../hooks/UseResources";
import LoadingPage from "./Loading";
import AddIconButton from "../components/AddIconButton";
import { useEffect, useContext } from "react";
import TokenContext from "../context/AuthContext"; // Importamos el contexto de autenticación
import ErrorPage from "./ErrorPage";
import { redirect, useLocation, useNavigate } from "react-router-dom"; // Importamos useNavigate para navegar entre rutas
import { useTopics } from "../hooks/UseResources";
import { QueryClient } from "@tanstack/react-query";
import HeaderContext from "../context/HeaderContext"; // Importamos el contexto del encabezado
import { get } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import NoContentPage from "./NoContentPage";

const Subjects = () => {
  // Obtenemos el token y la función para actualizarlo desde el contexto de autenticación
  const { isTokenValid } = useContext(TokenContext);
  const { title, setTitle, setPageType } = useContext(HeaderContext);
  const location = useLocation();
  useEffect(() => {
    setTitle("Asignaturas");
    setPageType("subject");
  }, []);

  // Obtenemos la función getSubjects desde un custom hook
  const { getSubjects } = useSubjects();

  // Usamos React Query para hacer la petición a la API y manejar loading/error/data automáticamente
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["subjects"], // Clave para caché y refetching
    queryFn: getSubjects,
  });

  // Mientras se cargan los datos, mostramos una página de carga
  if (isLoading) {
    return <LoadingPage />;
  }

  // Si ocurre un error en la consulta, mostramos el mensaje
  if (isError) {
    // Redirige a la página de login si hay un error
    return (
      <ErrorPage
        errorTitle={error.message}
        errorMessage={"Ha ocurrido un problema al cargar tus asignaturas"}
      />
    );
  }

  if(!data){
    return (<NoContentPage title={"Ninguna asignatura disponible"} message={"¡Crea alguna!"}></NoContentPage>);

  }


  // Render principal de la página de asignaturas
  return (
    <div style={{ height: "100%" }}>
      {/* Título y botón para añadir asignaturas */}

      {/* Renderizamos la lista de asignaturas en tarjetas */}
      <div
        className="d-flex rounded-4 flex-row flex-wrap align-items-start"
        style={{ height: "100%", overflowY: "auto" }}
      >
        <AnimatePresence>
          {
            data.map((subject) => (
              <SubjectCard
                key={subject.id}
                id={subject.id}
                name={subject.name}
                isFav={subject.isFav == 0 ? false : true}
              />
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Subjects;
