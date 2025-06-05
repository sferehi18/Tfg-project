import React, { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import SearchList from './SearchList';

function SearchBar() {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    const query = inputRef.current.value;
    setInputValue(query);
  };

  return (
    <div style={{ position: 'relative', width:"100%", maxWidth: '500px' }}>
      {/* Search input bar */}
      <div className="rounded-5 p-2 gap-2 bg-body-secondary shadow-sm d-flex justify-content-start align-items-center ">
        <Button
          className="bi bi-search p-1 btn-sm  text-body-secondary"
          style={{ backgroundColor: 'transparent', border: 'none' }}
        ></Button>
        <input
          ref={inputRef}
          type="text"
          className="search-input text-body"
          placeholder="Buscar..."
          onInput={handleSearch}
        />
       
      </div>

      {/* Dropdown list */}
      {inputValue && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            zIndex: 999,
          }}
        >
          <SearchList searchInput={inputValue} />
        </div>
      )}
    </div>
  );
}

export default SearchBar;
