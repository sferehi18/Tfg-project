import React from "react";
import { createContext, useState } from "react";

// 1. Crear el contexto
const CreationContext = createContext();

export function CreationProvider({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen,setIsMenuOpen] = useState(false);
    const openMenu = () => {
      setIsMenuOpen(true);
      console.log("Creation menu opened");
    }
     const closeMenu = () => {
      setIsMenuOpen(false);
      console.log("Creation menu closed");
     }

     const openModal = () => {
        setIsModalOpen(true);
        console.log("Creation menu opened");
      }
       const closeModal = () => {
        setIsModalOpen(false);
        console.log("Creation menu closed");
      }

return(
    <CreationContext.Provider value={{openMenu,closeMenu,openModal,closeModal,isMenuOpen,isModalOpen}}>{children}
    </CreationContext.Provider>
)


}

export default CreationContext;
