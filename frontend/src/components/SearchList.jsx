import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SearchList({ searchInput }) {
  const [show, setShow] = useState(false);

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

  return (
    <Dropdown.Menu show className="w-100 shadow bg-white rounded">
      {filteredResources.map((result) => (
        <Dropdown.Item
        key={result.id}
        as={Link}
        to={`/subject/${result.id}/topics/`}
      >
        {result.name}
      </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  );
}

export default SearchList;
