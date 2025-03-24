import React from "react";
import SearchBar from "../components/SearchBar";
function Header() {
  return (
    <div className="row align-items-center g-3 mt-1 p-1">
      {/* Logo y texto */}
      <div className="ml-4  col-md-2 col-sm-5 col-5 d-flex align-items-center ">
        <img src="/images/LOGO 1.png" alt="Logo" className="logo" />
        <h3 className="ms-2 fs-4 fw-bold">edu-vault</h3>
      </div>

      {/* Barra de búsqueda */}
      <SearchBar></SearchBar>
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
      <div className=" col-md-4  col-sm-3 col-3 d-flex justify-content-end align-items-center">
       
        <i className="bi-bell fs-4 me-4"></i>
      
        
        <i className="bi-person fs-4 "></i>
      </div>
    </div>
  );
}

export default Header;
