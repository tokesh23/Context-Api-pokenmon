 // src/PokemonContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
    
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10'); 
        const pokemonList = response.data.results;

    
        const pokemonData = await Promise.all(
          pokemonList.map(async (poke) => {
            const pokeResponse = await axios.get(poke.url);
            return pokeResponse.data;
          })
        );

        setPokemon(pokemonData);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemon }}>
      {children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };
