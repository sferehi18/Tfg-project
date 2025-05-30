import react from "react";
import { useContext } from "react";
import CreationContext from "../context/ModalsMenusContext";
import SimpleIconButton from "./SimpleIconButton";
import ModalTemplate from "./ModalTemplate";
import { useCrudOptions } from "../hooks/UseCrudOptions";
import { useParams } from "react-router-dom"; // Hook para obtener parámetros de la URL
import { useFiles } from "../hooks/UseResources";
import FileUploader from "./FileUploader"; // Componente para subir archivos
import { useRef } from "react"; // Hook para crear referencias a elementos del DOM
function AddIconButton({
  icon,
  animationClass,
  stylesClass,
  resourceType,
  subjectId,
}) {
  const { openModal } = useContext(CreationContext);
  const { subject, topic } = useCrudOptions();
  const { topicUri } = useParams();
  const [topicId,slug] = topicUri ? topicUri.split("-") : [];
  
   
  const fileInputRef = useRef(null);
  const { handleAddFile } = useFiles();
  const handleClick = () => {
    fileInputRef.current.click(); // Abre el diálogo de archivos
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleAddFile({ id: topicId, newFile: file });
    }
  };
  topic.createOption.resourceId = subjectId;

  const option =
    resourceType === "subject"
      ? subject.createOption
      : resourceType === "topic"
      ? topic.createOption
      : "file";
  const uniqueModalId = `addResource`;
  return (
    <>
      <SimpleIconButton
        icon={icon}
        onClick={
          resourceType != "file"
            ? () => openModal(uniqueModalId)
            : () => handleClick()
        }
        stylesClass={stylesClass}
      />
      {resourceType != "file" ? (
        <ModalTemplate
          title={option.label}
          fields={option.fields}
          resourceId={option.resourceId}
          modalOptionId={uniqueModalId}
          action={option.action}
          actionText={option.label}
          actionButtonStyle={option.actionButtonStyle}
          validations={option.validations}
        />
      ) : (
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }} // Oculta el input
        />
      )}
    </>
  );
}

export default AddIconButton;
