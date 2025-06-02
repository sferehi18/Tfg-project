import React, { useContext } from "react";
import SearchBar from "../components/SearchBar";
import SimpleIconButton from "../components/SimpleIconButton";
import { Link, useParams } from "react-router-dom";
import HeaderContext from "../context/HeaderContext";
import AddIconButton from "../components/AddIconButton";
import TooltipTitle from "../components/tooltipTitle";
function Header() {
  const {title,pageType} = useContext(HeaderContext);
  const {subjectUri} = useParams();
  const [subjectId, slug] = subjectUri ? subjectUri.split("-") : [];
  return (
    <div className=" container d-flex  flex-column   flex-nowrap    ">
      {/* Logo y texto */}
     

      {/* Barra de búsqueda */}
      
      <div
        className="row d-flex align-items-center justify-content-between  "
        
      >
           {/*<TooltipTitle  fontsize={"title"} customClasses={"col-6"}  tooltipText={title} placement={"bottom"} text={title}></TooltipTitle>*/}
           <h2 className="col  text-body p-2">{title}</h2>
          {pageType && <AddIconButton
                        icon={"bi bi-plus-lg"}
                        stylesClass={"me-3  col-6"}
                        resourceType={pageType} 
                        subjectId={subjectId} // Este valor se pasa al modal para saber qué tipo de recurso se va a crear
                        //Este valor se pasa al modal para saber qué tipo de recurso se va a crear
                      />}

          

         
      </div>
      {pageType && <div className=" row d-flex align-items-center pb-1 pt-2">
           
                                  <SearchBar customClasses={"col-9"}  />
                                 
            </div>}
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
      
    </div>
  );
}

export default Header;
