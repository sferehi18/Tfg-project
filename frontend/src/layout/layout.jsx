import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./SideBar";
import Content from "./Content";

function Layout() {
 
  return (
    //Contenedor definido con container-fluid de bootstrap para aplicar responsividad
    <>
      <div className="row">
      <aside className="col-md-4 col-xl-2 col-lg-3 col-sm-2 col-3">
          <Sidebar />
        </aside>
        <div className="col-9 col-md-8 col-xl-10 col-lg-9 col-sm-10 mt-1">
        <header  >
        <Header />
      </header>
      <main className="">
          <Content  /> {/* React Router renderizará aquí el contenido dinámico */}
        </main>
        </div>
       
      </div>
      
       
    
    </>
  );
}

export default Layout;
