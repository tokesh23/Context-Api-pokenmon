 
import React, { useContext } from 'react';
import { PokemonContext } from './PokemonContext';
import './App.css';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useContext(PokemonContext);

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for Pokémon..."
      />
    </div>
  );
};

export default SearchBar;
