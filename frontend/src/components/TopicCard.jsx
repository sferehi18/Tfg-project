import React from "react";
import ThreeDots from "./threedots";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaBook, FaReact } from "react-icons/fa";
import { useSlug } from "../hooks/useSlug";
function TopicCard({ description, name, subjectId, topicId }) {
  //Definición de estilos para la TopicCard
  const cardstyle = {
    
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  };
  const {slugify} = useSlug();

  return (
    //Estructura de la topicCard , todos los temas se mostrarán segun la misma en el componente Topic.jsx

   <div className="d-flex align-items-center justify-content-between rounded-2 resource bg-body-secondary text-body m-4 w-75">
  <Link
    to={`${topicId}-${slugify(name)}/files`}
    className="text-decoration-none w-100 p-3"
  >
    <div className="d-flex flex-row flex-nowrap align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-3 justify-content-center">
        <div className="bg-primar d-flex justify-content-center rounded-5 p-2">
          <FaBook size="20px" color="white" />
        </div>
        <div>
          <h5 className="align-self-start text-body">{name}</h5>
        </div>
      </div>
    </div>
  </Link>

  <ThreeDots
    resourceId={topicId}
    stylesClass="text-body"
    resourceType="topic"
  />
</div>

  );
}

export default TopicCard;
