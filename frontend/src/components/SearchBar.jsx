import React from "react";
import { Button } from "react-bootstrap";
import SearchList from "./SearchList";
import { useForm } from "react-hook-form";
import { useSubjects } from "../hooks/UseResources";
function SearchBar() {
  useForm();
  const { handleSubmit, register } = useForm();
 
    let resultslist = null;
  const search = (data) => {
    console.log(data);
 resultslist = <SearchList searchResults={[data]}></SearchList>;
  };

  return (
    <>
      <div className="rounded-5 p-2 gap-2 col-md-6 bg-black bg-opacity-10 col-4 d-flex justify-content-start align-items-center">
        <Button
          onClick={handleSubmit(search)}
          className="bi bi-search p-1 btn-sm search-button"
          style={{ backgroundColor: "transparent", border: "none" }}
        ></Button>
        <input
            {...register("search")}
          type="text"
          className="  search-input  "
          placeholder="Buscar..."
        ></input>
        <i className="bi bi-filter p-1"></i>
      </div>

    
    </>
  );
}

export default SearchBar;
