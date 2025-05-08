import React from "react";
import SearchBar from "../components/SearchBar";
import SimpleIconButton from "../components/SimpleIconButton";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className=" row d-flex align-items-center  flex-nowrap p-1 mt-1   ">
      {/* Logo y texto */}
     

      {/* Barra de búsqueda */}
      
      <div
        className="col-md-8 col-sm-9 col-9"
        
      >
        <SearchBar />
      </div>
     {/* <div className="col-md-6  col-4 d-flex justify-content-center align-items-center ">
  <div className="input-group ">
    <span className="input-group-text ">
      <i className="bi bi-search"></i>
    </span>
    <input
      type="search"
      className="form-control form-control-md bg-opacity-10"
      placeholder="Buscar..."
    />
  </div>
</div>*/}


      {/* Iconos */}
      <div className=" col-md-4  col-sm-3 col-3 d-flex justify-content-end ">
       
      
      
      <Link to="/userSettings" className="text-decoration-none"> 
        <SimpleIconButton icon={"bi bi-person fs-3"}></SimpleIconButton>
        </Link>
      </div>
    </div>
  );
}

export default Header;
