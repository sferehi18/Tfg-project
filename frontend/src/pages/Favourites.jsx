import React from "react";

import { useQuery } from "@tanstack/react-query";

import { useSubjects } from "../hooks/UseResources";
import SubjectCard from "../components/SubjectCard";
function Favourites() {
  const { getSubjects } = useSubjects();

  const { data: subjects, isLoading, error } = useQuery({
    queryKey: ["subjects"],
    queryFn: getSubjects,

  }
    
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const favouriteSubjects = subjects.filter((subject) => subject.isFav == 1);
  return (
    <div className="bg-white rounded-4">
    <h2 className="p-3">Asignaturas</h2>

    {/* Lista de asignaturas obtenidas del backend */}
    <div className="bg-white d-flex overflow-auto gap-2 flex-wrap text-align-start contentContainer">
      {favouriteSubjects && favouriteSubjects.map((subject) => (
        // Se genera una SubjectCard por cada asignatura
        // La key es necesaria para que React optimice los cambios en la lista
        <SubjectCard key={subject.id} isFav={subject.isFav == 0 ? false : true } id={subject.id} name={subject.name} />
      ))}
    </div>
  </div>
  );
}

export default Favourites;