import { useState, useEffect } from 'react';
import useDebounce from './hooks/useDebounce';
import GetPokemon from './GetPokemon';
import './main.css';

export default function SearchPokemon() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState(null);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(search.trim());
  const pokeApiBaseUrl = 'https://pokeapi.co/api/v2/pokemon/';

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    async function fetchPokemon(fetchTimeout = 3000) {
      if (!debouncedQuery) {
        setQuery(null);
        setError(null);
        return;
      }

      try {
        const result = await fetch(`${pokeApiBaseUrl}${debouncedQuery}`, {
          signal: AbortSignal.timeout(fetchTimeout)
        });

        if (!result.ok) {
          throw new Error('Pokemon not found');
        }

        const data = await result.json();
        setQuery(data);
        setError(null);
      } catch (error) {
        if (error.name === 'TimeoutError') {
          setError('Request timed out. No Pokemon found! Please search again.');
        } else {
          setError('No Pokemon found! Please search again.');
        }
        setQuery(null);
      }
    }

    fetchPokemon();
  }, [debouncedQuery]);

  return (
    <div id="pokemon">
      <h1>Find Pokemon</h1>
      <label htmlFor="pokemonNameOrId">
        <p>
          Search by Pokemon Name or ID
          <br />(
          <a href="https://pokemondb.net/pokedex/national" target="_blank">
            see Pokemon names and IDs
          </a>
          )
        </p>
        <input
          id="pokemonNameOrId"
          name="pokemonNameOrId"
          type="text"
          value={search}
          onChange={handleSearch}
        />
      </label>
      <GetPokemon query={query} error={error} />
    </div>
  );
}
