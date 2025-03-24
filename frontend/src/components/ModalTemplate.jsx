import React, { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import CreationContext from "../context/ModalsMenusContext";
import { useForm } from "react-hook-form";

function ModalTemplate({ title, fields, action, modalId,message}) {
  const { isModalOpen, closeModal } = useContext(CreationContext);
    const {handleSubmit,register} = useForm();

  const handleonSubmit = (data) => {
    
    action(data);
    closeModal();
  };
  let modalbody=null;
  if(fields){
    modalbody=
        fields && fields.map((fieldname) => (
            <div key={fieldname + modalId} className="form-floating mb-3">
            
              <input
               {...register(fieldname)} type="text"
                className="form-control"
              
               
              />
              <label>{fieldname}</label>
            </div>
          ))
    
  }else{
    modalbody = <Modal.Dialog>{message}</Modal.Dialog>
  }

  return (
    <Modal show={isModalOpen === modalId} onHide={closeModal} centered>
      <form onSubmit={ handleSubmit(handleonSubmit)}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
             {modalbody}
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Crear
          </Button>
          <Button variant="secondary" onClick={closeModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default ModalTemplate;
