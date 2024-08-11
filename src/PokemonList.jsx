    // src/PokemonList.js
import React, { useContext } from 'react';
import { PokemonContext } from './PokemonContext';

const PokemonList = () => {
  const { pokemon, loading } = useContext(PokemonContext);

  if (loading) return <p>Loading...</p>;
  if (!pokemon || pokemon.length === 0) return <p>No Pokémon data available.</p>;

  return (
    <ul>
      {pokemon.map((poke) => (
        <li key={poke.id}>
          <img src={poke.sprites.front_default} alt={poke.name} />
          {poke.name}
        </li>
      ))}
    </ul>
  );
};

export default PokemonList;
