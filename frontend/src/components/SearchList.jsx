import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import searchResult from './searchResult';
import { useLocation } from 'react-router-dom'; // Importamos useLocation para obtener la ubicación actual
import { useTopics } from '../hooks/UseResources';
import { useContext } from 'react';
function SearchList({ searchInput }) {
  const [show, setShow] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
  searchInput != null ?  setShow(true) : setShow(false);
  }, [searchInput]);

 const subjectId = location.pathname.split('/')[2]; // Obtener el ID de la asignatura de la URL
  const queryClient = useQueryClient();
  const cachedSubjects = queryClient.getQueryData(['subjects']) || [];
  const cachedTopics =  queryClient.getQueryData(['topics'])
 || [];
  cachedSubjects.forEach((subject) => {
    subject.type = 'subject'; // Añadir el tipo a cada asignatura
  });
  cachedTopics.forEach((topic) => {
    topic.type = 'topic'; // Añadir el tipo a cada tema
  });
  const filterResources = (resourcesArray) =>{
    const filteredResources = resourcesArray.filter((resource) =>
      resource.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    return filteredResources;

  }
  const filteredResources = filterResources(cachedSubjects).concat(filterResources(cachedTopics));
   


  return (
    <Dropdown.Menu show={show} className="w-100 shadow bg-white rounded overflow-auto" style={{ maxHeight: '300px' }}>
      {filteredResources.map((result) => (
      
        <Dropdown.Item
        key={result.id +result.type}
        as={searchResult}
        resourceType={result.type === 'topic' ? 'Tema' : 'Asignatura'}
        resourceName={result.name}
        resourceId={result.id}
        subjectId={subjectId}
        onClick={result.type == "subject" ? () =>{
  navigate(`/subject/${result.id}-${result.name}/topics/`);
  setShow(false);
} : () =>{
  navigate(`subject/${subjectId}/topics/${result.id}/files/`);
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
