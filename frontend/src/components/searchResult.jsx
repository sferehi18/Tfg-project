import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Importamos useLocation para obtener la ubicación actual

function SearchResult({ResourceType,resourceId,resourceName,onClick}) {
  const location = useLocation();
  useEffect(() => {
    console.log("La ubicación ha cambiado:", location);
  }, [location]);
  const gotTopage = (id) =>{
    navigate(`/subject/${id}/topics/`);
    setShow(false);
  }
  return (
    <button onClick={gotTopage}></button>);}

    export default SearchResult;