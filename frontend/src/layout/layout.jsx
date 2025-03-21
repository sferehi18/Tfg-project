import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./SideBar";
import Content from "./Content";

function Layout() {
  

  return (
    
    
    <div className="container-fluid">
      
      <header>
        <Header />
      </header>

      <div className="row d-flex">
        <aside className="col-2 col-md-3 col-xl-2 col-sm-4 mt-2">
          <Sidebar />
        </aside>

        <main className="col-10 col-md-9 col-xl-10 col-sm-8 mt-4">
          <Content  /> {/* React Router renderizará aquí el contenido dinámico */}
        </main>
      </div>
    </div>
  );
}

export default Layout;
