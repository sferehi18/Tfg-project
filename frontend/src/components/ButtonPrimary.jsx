import React from "react";
import { useContext } from "react";
import CreationContext from "../context/CreationContext";
import OptionsList from "./OptionsList";
import AddMenu from "./AddMenu";
function ButtonPrimary({ text, icon}) {
const {openMenu,closeMenu} = useContext(CreationContext);
  return (
  
 <div onMouseLeave={closeMenu}>
      <button
        className="btn btn-primary d-flex align-items-center p-3 mt-3"
        onClick={openMenu}
        // Si necesitas alguna acción adicional cuando se haga clic en el botón
>
        <i className={icon}></i> <span className="ms-2 hide">{text}</span>
      </button>
      <OptionsList ></OptionsList>
      <AddMenu />
    </div>
   
   
  );
}

export default ButtonPrimary;
