import React, { useEffect, useState } from 'react';

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPokemon(data.results); // Adjust based on the actual API response structure
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
        <li key={poke.name}>{poke.name}</li> // Assuming poke.name is unique
      ))}
    </ul>
  );
};

export default PokemonList;
