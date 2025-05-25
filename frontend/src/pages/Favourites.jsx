import React from "react";

import { useQuery } from "@tanstack/react-query";

import { useSubjects } from "../hooks/UseResources";
import SubjectCard from "../components/SubjectCard";
import TokenContext from "../context/AuthContext";
import { useContext } from "react";
function Favourites() {
  const { getSubjects } = useSubjects();
  const {isTokenValid} = useContext(TokenContext);
  const { data: subjects, isLoading, error } = useQuery({
    queryKey: ["subjects"],
    queryFn: getSubjects,
    enabled:isTokenValid()

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
    <div className="" style={{ height: "82vh" }}>
    <h2 className="p-3">Asignaturas</h2>

    {/* Lista de asignaturas obtenidas del backend */}
    <div className=" d-flex overflow-auto gap-2 flex-wrap text-align-start contentContainer">
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