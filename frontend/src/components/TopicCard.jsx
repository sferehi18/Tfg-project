import React from "react";
import ThreeDots from "./threedots";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaBook, FaReact } from "react-icons/fa";
function TopicCard({ description, name, subjectId, topicId }) {
  //Definición de estilos para la TopicCard
  const cardstyle = {
    height: "100px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  };

  return (
    //Estructura de la topicCard , todos los temas se mostrarán segun la misma en el componente Topic.jsx

    <div
      className="d-flex align-items-center justify-content-between rounded-2 resource bg-white m-4  w-75"
      style={cardstyle}
    >
      <Link
        to={`${topicId}/files`}
        className="text-decoration-none text-black w-100 h-100  p-3"
      >
        <div className="d-flex flex-row flex-nowrap align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3 justify-content-center">
            <div className="bg-primar d-flex justify-content-center  rounded-5 p-2">
              <FaBook size={"20px"} color="white" />
            </div>
            <div>
              <h5 className="card-title align-self-start">{name}</h5>
            </div>
          </div>
        </div>
      </Link>

      <>
        <ThreeDots
          resourceId={topicId}
          stylesClass={"text-black"}
          resourceType={"topic"}
        ></ThreeDots>
      </>
    </div>
  );
}

export default TopicCard;
