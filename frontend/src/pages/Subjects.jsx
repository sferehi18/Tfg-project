import React, { useId } from "react";
import SubjectCard from "../components/SubjectCard";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const Subjects = () => {

  const getSubjects = () => {
    return axios.get("http://localhost:3000/subjects")
      .then(response => {
        return response.data;
      })
     
  };
  

const {isLoading, isError , data, error} = useQuery({
  queryKey: ['subjects'],
  queryFn:  getSubjects
});



  const contentstyle = {
    height: '75vh'
  };

    // Verificación de los estados de carga y error
    if (isLoading) {
      return <div className="">Cargando...</div>;
    }
  
    if (isError) {
      return <div>Error: {error.message}</div>;
    }
  return (
    
    <div className="bg-white rounded-2">
      <div>
        <h2 className="p-3">Asignaturas</h2>
      </div>

      <div style={contentstyle} className="bg-white d-flex overflow-auto gap-2 flex-wrap">

        { !isLoading && !isError && data.map((subject) => (
          <Link to={`/topics/${subject.id}`} key={subject.id}  className="text-decoration-none">
            <SubjectCard id={subject.id} name={subject.name} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Subjects;