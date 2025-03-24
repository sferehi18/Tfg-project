import React from "react";
import { Modal, ModalHeader } from "react-bootstrap";
import { useContext } from "react";
import CreationContext from "../context/ModalsMenusContext";
function ConfirmActionModal({question,warningMessage,confirmButtonText,AbortButtonText,confirmButtonType,modalId}){
const {openModal,isOpenModal,closeModal} = useContext(CreationContext);
    return(
        <Modal show={isOpenModal == modalId} onHide={closeModal} centered>
            <ModalHeader>
                {question}
            </ModalHeader>
            <Modal.Body>
                <Modal.Dialog >
                    {warningMessage}
                </Modal.Dialog>
            </Modal.Body>

            <Modal.footer>
               <Button variant={confirmButtonType}>{confirmButtonText}</Button> 
               <Button variant="close" onClick={closeModal}>{AbortButtonText}</Button> 
            </Modal.footer>
        </Modal>
    )
}


export default ConfirmActionModal;