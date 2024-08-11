 // src/PokemonList.js
import React, { useContext } from 'react';
import { PokemonContext } from './PokemonContext';
import './App.css';

const PokemonList = () => {
  const { pokemon } = useContext(PokemonContext);

  return (
    <div className="pokemon-list">
      {pokemon.map(poke => (
        <div key={poke.id} className="pokemon-item">
          <h3>{poke.name}</h3>
          <img src={poke.sprites.front_default} alt={poke.name} />
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
