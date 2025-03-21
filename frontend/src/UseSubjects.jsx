import { useState, useEffect } from "react";
import axios from "axios";

function useSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);

  // Obtener asignaturas al montar el componente


  // Obtener todas las asignaturas
  const getSubjects = () => {
  
      axios.get("http://localhost:3000/subjects").then(
        setSubjects(response.data)
      ).catch(err =>
        setError(err)
      );
     

      
    
  };

  // Agregar una nueva asignatura y actualizar la lista
  const addSubject = async (subject) => {
    try {
      const response = await axios.post("http://localhost:3000/subjects", subject);
      setSubjects((prevSubjects) => [...prevSubjects, response.data]); 
      console.log("Nuevo estado de subjects:", subjects);  // 🔍 Verifica si cambia
    } catch (err) {
      setError(err);
    }
  };
  

  // Eliminar una asignatura y actualizar la lista
  const delSubject = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/subjects/${id}`);
      setSubjects((prevSubjects) => prevSubjects.filter((subject) => subject.id !== id)); // ✅ Se actualiza sin recargar
    } catch (err) {
      setError(err);
    }
  };

  return { subjects, error, addSubject, delSubject };
}

export default useSubjects;
