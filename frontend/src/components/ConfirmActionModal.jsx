import React from "react"; 
import { Modal, ModalHeader } from "react-bootstrap"; // Importamos los componentes de modal de React-Bootstrap
import { useContext } from "react"; 
import CreationContext from "../context/ModalsMenusContext"; // Importamos el contexto para gestionar los modales y menús
import { Button } from "react-bootstrap"; // Importamos el componente Button de React-Bootstrap

/**
 * Componente ConfirmActionModal:
 * - Renderiza un modal de confirmación antes de ejecutar una acción importante.
 * - Muestra un mensaje de advertencia y botones para confirmar o cancelar.
 * 
 * Props:
 * @param {Function} action - Función que se ejecuta al confirmar.
 * @param {string} title - Título del modal.
 * @param {string} warningMessage - Mensaje de advertencia para el usuario.
 * @param {string} confirmButtonText - Texto del botón de confirmación.
 * @param {string} confirmButtonType - Tipo de estilo del botón de confirmación (ej. "danger", "primary").
 * @param {string} modalId - Identificador único del modal.
 * @param {string} resourceId - ID del recurso que se usará en la acción.
 */
function ConfirmActionModal({ action, title, warningMessage, confirmButtonText, confirmButtonType, modalId, resourceId }) {
    // Accedemos al estado del contexto para manejar la visibilidad del modal
    const { isModalOpen, closeModal } = useContext(CreationContext);

    return (
        // Modal de confirmación, se muestra si isModalOpen coincide con el modalId
        <Modal show={isModalOpen === modalId} onHide={closeModal} centered>
            
            {/* Encabezado del modal con el título */}
            <ModalHeader>
                {title}
            </ModalHeader>

            {/* Cuerpo del modal con el mensaje de advertencia */}
            <Modal.Body>
                <p>{warningMessage}</p>
            </Modal.Body>

            {/* Pie del modal con botones de acción */}
            <Modal.Footer>
                {/* Botón de confirmación que ejecuta la acción al hacer clic */}
                <Button variant={confirmButtonType} onClick={() => action(resourceId)}>
                    {confirmButtonText}
                </Button> 

                {/* Botón para cerrar el modal sin realizar ninguna acción */}
                <Button variant="secondary" onClick={closeModal}>
                    Cancelar
                </Button> 
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmActionModal; // Exportamos el componente para su uso en otros archivos
