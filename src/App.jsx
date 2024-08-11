 // src/App.js
import React from 'react';
import { PokemonProvider } from './PokemonContext';
import PokemonList from './PokemonList';

const App = () => (
  <PokemonProvider>
    <h1>Pokémon List</h1>
    <PokemonList />
  </PokemonProvider>
);

export default App;
