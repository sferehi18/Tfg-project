import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function SearchList({ searchInput }) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
  searchInput != null ?   setShow(true) : setShow(false);
  }, [searchInput]);

  const queryClient = useQueryClient();
  const cachedSubjects = queryClient.getQueryData(['subjects']) || [];
  const cachedTopics = queryClient.getQueryData(['topics']) || [];
  const filterResources = (resourcesArray) =>{
    const filteredResources = resourcesArray.filter((resource) =>
      resource.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    return filteredResources;

  }
  const filteredResources = filterResources(cachedSubjects).concat(filterResources(cachedTopics));

  if (!show || filterResources === 0) return null;
const gotTopage = (id) =>{
  navigate(`/subject/${id}/topics/`);
  setShow(false);
}
  return (
    <Dropdown.Menu show className="w-100 shadow bg-white rounded">
      {filteredResources.map((result) => (
        <Dropdown.Item
        key={result.id}
        as={Button}
       onClick={() => gotTopage(result.id)}
      >
        {result.name}
      </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  );
}

export default SearchList;
