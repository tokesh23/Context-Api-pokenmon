import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10'); // Limit to 10 for simplicity
        const pokemonData = await Promise.all(
          response.data.results.map(async (poke) => {
            const pokeResponse = await axios.get(poke.url);
            return pokeResponse.data;
          })
        );
        setPokemon(pokemonData);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error); // Log error but do not set state for error
      }
    };

    fetchPokemon();
  }, []); 

  if (pokemon.length === 0) return <p>No Pokémon data available.</p>; // Simple fallback if data is empty

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
