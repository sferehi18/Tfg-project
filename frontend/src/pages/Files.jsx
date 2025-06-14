import React from "react";
import Filetable from "./FileTable";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useFiles } from "../hooks/UseResources";
import AddIconButton from "../components/AddIconButton";
import TokenContext from "../context/AuthContext";
import { useContext } from "react";
import { useEffect } from "react";
import HeaderContext from "../context/HeaderContext";
import NoContentPage from "./NoContentPage";
import LoadingPage from "./Loading";
function Files() {
  const { isTokenValid } = useContext(TokenContext);
  const { subjectUri, topicUri } = useParams(); // Extraer subjectId y topicId de la URL
  const [topicId, slug] = topicUri ? topicUri.split("-") : [];
  const navigate = useNavigate();
  const { setTitle, setPageType } = useContext(HeaderContext); // Extraer el contexto del encabezado, aunque no se usa en este componente
  useEffect(() => {
    if (!slug) {
      navigate(-1);
    } else {
      setTitle(`Archivos del Tema ${slug}`); // Establecer el título del encabezado
      setPageType("file"); // Establecer el tipo de página para el encabezado
    }
  }, []);

  const { getFiles } = useFiles(); // Hook para manejar archivos
  const { isLoading, error, data } = useQuery({
    queryKey: ["files"],
    queryFn: () => getFiles(topicId),
  });
  if (isLoading) return <LoadingPage></LoadingPage>; // Mostrar mensaje de carga
  if (error) return <div>Error: {error.message}</div>;
  if (!data || data.length === 0)
    return (

      <div className="d-flex justify-content-center align-items-center h-100">
        <NoContentPage
        message={"Aún no hay archivos disponibles para este tema"}
        title={"Añade algunos archivos"}
      ></NoContentPage>
      </div>
      
    );
  return (
    <div style={{ height: "82vh" }}>
      {data && <Filetable files={data}></Filetable>}
    </div>
  );
}

export default Files;
