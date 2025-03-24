import React from "react";
import { Button } from "react-bootstrap";

function SearchBar(){

    return(
        <div className="rounded-5 p-2 gap-2 col-md-6 bg-black bg-opacity-10 col-4 d-flex justify-content-start align-items-center">
            <Button className="bi bi-search p-1 btn-sm search-button" style={{backgroundColor:'transparent', border:'none'}}></Button>
            <input type="text" className="  search-input  " placeholder="Buscar..." >
            

        </input>
        <i className="bi bi-filter p-1"></i>
        </div>
        


        );
}

export default SearchBar;