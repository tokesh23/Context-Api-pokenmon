 
import React from 'react';
import { PokemonProvider } from './PokemonContext';
import SearchBar from './SearchBar';
import PokemonList from './PokemonList';
import './App.css';

const App = () => {
  return (
    <PokemonProvider>
      <SearchBar />
      <PokemonList />
    </PokemonProvider>
  );
};

export default App;
