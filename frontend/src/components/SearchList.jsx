import reac from 'react';

function SearchList({searchResults}){
    return(
        <div className="overflow-auto" style={{maxHeight:"400px"}}>
            <ul className="list-group list-group-flush">
                {searchResults.map((result) => (
                    <li key={result.id} className="list-group-item">{result.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default SearchList;