// src/PokemonContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.error('Error fetching Pokémon data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemon, loading }}>
      {children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };
