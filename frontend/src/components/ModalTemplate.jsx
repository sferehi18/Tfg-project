import React, { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import CreationContext from "../context/ModalsMenusContext";
import { useForm } from "react-hook-form";
import { useSubjects } from "../hooks/UseResources";

function ModalTemplate({ title, fields, action, modalOptionId,message,actionText,actionButtonStyle,resourceId}) {
  const { isModalOpen, closeModal } = useContext(CreationContext);
    const {handleSubmit,register} = useForm();

  const handleonSubmit = resourceId ? ((data) => {
    
    action({ id: resourceId, newValues: data }); // Pasa un solo objeto
    closeModal();
  }) : (!fields) ? (() =>{
    action();
    closeModal();

  }) : ((data) => {
    action(data); 
    closeModal();
  });

  let modalbody=null;
  (fields) ? ( modalbody=
    fields.map((fieldname) => (
        <div key={fieldname + modalOptionId} className="form-floating mb-3">
        
          <input
           {...register(fieldname)} type="text"
            className="form-control"
          
           
          />
          <label>{fieldname}</label>
        </div>
      ))) : (modalbody = <p>{message}</p>);
   
    

    
  

  return (
    <Modal show={isModalOpen === modalOptionId} onHide={closeModal} centered>
      <form onSubmit={ handleSubmit(handleonSubmit)}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
             {modalbody}
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant={actionButtonStyle} type="submit">
           {actionText}
          </Button>
          <Button variant="secondary" onClick={ closeModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default ModalTemplate;
