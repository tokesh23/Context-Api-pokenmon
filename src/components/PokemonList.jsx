import React, { useEffect, useState } from 'react';

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10'); // Limit to 10 for simplicity
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const pokemonData = await Promise.all(
          data.results.map(async (poke) => {
            const pokeResponse = await fetch(poke.url);
            if (!pokeResponse.ok) {
              throw new Error('Network response was not ok');
            }
            return pokeResponse.json();
          })
        );
        setPokemon(pokemonData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading Pokémon data: {error}</p>;
  if (!pokemon || !Array.isArray(pokemon)) return <p>No Pokémon data available.</p>;

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
