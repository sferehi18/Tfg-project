import React from "react";
import { createContext, useState } from "react";

// 1. Crear el contexto
const CreationContext = createContext();

export function CreationProvider({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(null);
    const [isMenuOpen,setIsMenuOpen] = useState(null);

    const openMenu = (menuId) => {
      setIsMenuOpen(menuId);
      console.log("Menu opened");
    }
     const closeMenu = () => {
      setIsMenuOpen(null);
      console.log("Menu closed");
     }

     const openModal = (modalId) => {
        setIsModalOpen(modalId); // Asegúrate de que el estado se actualice correctamente
        console.log("Modal opened" + modalId);
      }
       const closeModal = () => {
        setIsModalOpen(null);
        console.log("Modal closed");
      }

return(
    <CreationContext.Provider value={{openMenu,closeMenu,openModal,closeModal,isMenuOpen,isModalOpen}}>
      {children}
    </CreationContext.Provider>
)


}

export default CreationContext;
