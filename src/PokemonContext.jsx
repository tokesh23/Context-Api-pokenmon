 // src/PokemonContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";

const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  // Function to filter Pokémon based on the search term
  const filteredPokemon = pokemon.filter(poke =>
    poke.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='div-grid'>
      <PokemonContext.Provider value={{ pokemon: filteredPokemon, searchTerm, setSearchTerm }}>
        {children}
      </PokemonContext.Provider>
    </div>
  );
};

export { PokemonContext, PokemonProvider };
