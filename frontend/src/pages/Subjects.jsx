import React, { useId } from "react";
import SubjectCard from "../components/SubjectCard";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import useSubjects from "../hooks/UseSubjects";
import ThreeDots from "../components/threedots";
const Subjects = () => {

 const {getSubjects} = useSubjects();
  

const {isLoading, isError , data, error} = useQuery({
  queryKey: ['subjects'],
  queryFn:  getSubjects
});




    // Verificación de los estados de carga y error
    if (isLoading) {
      
      return <div className="bg-white d-flex justify-content-center align-items-center w-100 "><Spinner animation="border" variant="primary" className=""></Spinner></div> ;
    }
  
    if (isError) {
      return <div>Error: {error.message}</div>;
    }

  return (
    
    <div className="bg-white rounded-4">
       <h2 className="p-3 ">Asignaturas</h2>

      <div className="bg-white d-flex overflow-auto gap-2 flex-wrap text-align-start contentContainer">
   
     

        { !isLoading && !isError && data.map((subject) => (
         
            <SubjectCard key={subject.id} subjectId={subject.id} name={subject.name} />
      
        ))}
       
        
      </div>
    </div>
  );
};

export default Subjects;