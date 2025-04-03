import React from "react"; // Permite escribir JSX
import SubjectCard from "../components/SubjectCard";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "react-bootstrap";
import {useSubjects} from "../hooks/UseResources";
import LoadingPage from "./Loading";

const Subjects = () => {
  const { getSubjects } = useSubjects();

  // useQuery permite obtener los datos del backend y almacenarlos en caché
  // queryKey: Identifica esta consulta en la caché
  // queryFn: Función que devuelve una promesa con los datos de la API
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["subjects"],
    queryFn: getSubjects,
  });

  // Si los datos están cargando, se muestra una Pagina de carga
  if (isLoading) {
    return (
     <LoadingPage></LoadingPage>
    );
  }

  // Si hay un error en la petición, se muestra el mensaje de error
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    // Contenedor principal de la página de asignaturas
    <div className="bg-white rounded-4">
      <h2 className="p-3">Asignaturas</h2>

      {/* Lista de asignaturas obtenidas del backend */}
      <div className="bg-white d-flex overflow-auto gap-2 flex-wrap text-align-start contentContainer">
        {data && data.map((subject) => (
          // Se genera una SubjectCard por cada asignatura
          // La key es necesaria para que React optimice los cambios en la lista
          <SubjectCard key={subject.id} isFav={subject.isFav == 0 ? false : true } id={subject.id} name={subject.name} />
        ))}
      </div>
    </div>
  );
};

export default Subjects;
