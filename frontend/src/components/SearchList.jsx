import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Dropdown } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import searchResult from './searchResult';
import { useContext } from 'react';
import HeaderContext from '../context/HeaderContext'; // Importar el contexto del encabezado
function SearchList({ searchInput }) {
  const {pageType} = useContext(HeaderContext); // Extraer el contexto del encabezado
  const resourcesType = pageType+ "s"; // Asignamos el tipo de recursos según el contexto del encabezado

  const [show, setShow] = useState(false);
  
  const { subjectUri } = useParams(); // Extrae el "subjectId" desde la URL (ejemplo: /subjects/123)
const [subjectId, slug] = subjectUri ? subjectUri.split("-") : [];

  const navigate = useNavigate();
  useEffect(() => {
  searchInput != null ?  setShow(true) : setShow(false);
  }, [searchInput]);

 
  const queryClient = useQueryClient();
  const resources = queryClient.getQueryData([resourcesType]) || [];

  resources.forEach((resource) => {
    resource.type = resourcesType; // Añadir el tipo a cada asignatura
  });

  const filterResources = (resourcesArray) =>{
    const filteredResources = resourcesArray.filter((resource) =>
      resource.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    return filteredResources;

  }
  const filteredResources = filterResources(resources);
   const resourcesTranslated = {
    subjects: 'Asignatura',
    topics: 'Tema',
    files: 'Archivo',
  };
   

  return (
    <Dropdown.Menu show={show} className="w-100 shadow bg-body rounded overflow-auto" style={{ maxHeight: '300px' }}>
      {filteredResources.map((result) => (
      
        <Dropdown.Item
        key={result.id +result.type}
        as={searchResult}
        resourceType={resourcesTranslated[result.type] || result.type}
        resourceName={result.name}
        resourceId={result.id}
        subjectId={subjectId}
        onClick={result.type == "subject" ? () =>{
  navigate(`/subjects/${result.id}-${result.name}/topics/`);
  setShow(false);
} : () =>{
  navigate(`subjects/${subjectId}-${slug}/topics/${result.id}-${result.name}/files/`);
  setShow(false);
}}
      >
        {result.name}
      </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  );
}

export default SearchList;
