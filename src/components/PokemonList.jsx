import React, { useContext } from 'react';
import { PokemonContext } from '../PokemonContext';

const PokemonList = () => {
  const { pokemon, loading } = useContext(PokemonContext);

  if (loading) return <p>Loading...</p>;
  if (!pokemon || !Array.isArray(pokemon)) return <p>No Pokémon data available.</p>;

  return (
    <ul>
      {pokemon.map((poke, index) => (
        <li key={index}>{poke.name}</li>
      ))}
    </ul>
  );
};

export default PokemonList;
