import react from "react";
import { useContext } from "react";
import CreationContext from "../context/ModalsMenusContext";
import SimpleIconButton from "./SimpleIconButton";
import ModalTemplate from "./ModalTemplate";
import { useCrudOptions } from "../hooks/UseCrudOptions";
 function AddIconButton({icon,animationClass,stylesClass,resourceType,subjectId}) {
    const {openModal} = useContext(CreationContext);
    const {subject,topic} = useCrudOptions();
    topic.createOption.resourceId = subjectId;
    
    const option = resourceType === "subject" ? subject.createOption : topic.createOption;
    const uniqueModalId = `addResource`;
    return (
        <>
        <SimpleIconButton icon={icon} onClick={() => openModal(uniqueModalId)}  stylesClass={stylesClass}/>
         <ModalTemplate
                  title={option.label}
                  fields={option.fields}
                  resourceId={ option.resourceId}
                  modalOptionId={uniqueModalId}
                  action={option.action}
                  actionText={option.label}
                  actionButtonStyle={option.actionButtonStyle}
                />
        </>
        
        
    )  }

    export default AddIconButton;