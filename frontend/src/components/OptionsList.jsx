import React, { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import CreationContext from "../context/ModalsMenusContext";
import ModalTemplate from "./ModalTemplate";
import ConfirmActionModal from "./ConfirmActionModal";

function OptionsList({ optionsArray, menuId }) {
  const { isMenuOpen, openModal, closeMenu } = useContext(CreationContext);

  const handleOpenModal = (modalId) => {
   
    openModal(modalId);
    closeMenu();
    
  };

  return (
    <Dropdown onMouseLeave={closeMenu}  show={isMenuOpen === menuId} >
      <Dropdown.Menu>
        {optionsArray.map((option) => {
          const uniqueModalId = `${menuId}-${option.label}`; // Id unico para cada modal
          return (
            <div  key={uniqueModalId}>
              <Dropdown.Item 
                onClick={() => handleOpenModal(uniqueModalId)}
                href="#"
              >
                {option.label}
              </Dropdown.Item>
        

              {option.fields  ? (
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
                <ConfirmActionModal
                  title={option.label}
                  message={option.message}
                  confirmButtonType={option.actionButtonStyle} 
                  confirmButtonText={option.label} 
                  action={option.action}
                  modalId={uniqueModalId} 
                  resourceId={option.resourceId}
                />
              )}
            </div>
          );
        })}
          
      
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default OptionsList;
