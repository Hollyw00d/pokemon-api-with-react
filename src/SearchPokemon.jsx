import { useState, useEffect } from 'react';
import useDebounce from './hooks/useDebounce';
import GetPokemon from './GetPokemon';
import './SearchPokemon.css';

export default function SearchPokemon() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState(null);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(search.trim().toLowerCase(), 1000);
  const pokeApiBaseUrl = 'https://pokeapi.co/api/v2/pokemon/';

  const handleSearch = (e) => {
    setError(null);
    setSearch(e.target.value);
  };

  useEffect(() => {
    async function fetchPokemon(fetchTimeout = 5000) {
      if (!debouncedQuery) {
        setQuery(null);
        setError(null);
        return;
      }

      try {
        const result = await fetch(
          `${pokeApiBaseUrl}${encodeURIComponent(debouncedQuery)}`,
          {
            signal: AbortSignal.timeout(fetchTimeout)
          }
        );

        if (!result.ok) {
          throw new Error('Pokémon not found');
        }

        const data = await result.json();
        setQuery(data);
        setError(null);
      } catch (error) {
        if (error.name === 'TimeoutError') {
          setError('Request timed out. No Pokémon found! Please search again.');
        } else {
          setError('No Pokémon found! Please search again.');
        }
        setQuery(null);
      }
    }

    fetchPokemon();
  }, [debouncedQuery]);

  return (
    <main id="pokemon">
      <h1>Find Pokémon</h1>
      <p>
        <label htmlFor="pokemonNameOrId">
          Search by Pokémon Name or ID using the{' '}
          <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">
            PokéAPI
          </a>
        </label>
      </p>

      <p>
        <a
          href="https://pokemondb.net/pokedex/national"
          target="_blank"
          rel="noreferrer"
        >
          (See Pokémon names and IDs.)
        </a>
      </p>

      <p>Example searches:</p>
      <ul>
        <li>
          <code>pikachu</code>
        </li>
        <li>
          <code>25</code> (Pikachu ID)
        </li>
        <li>
          <code>Bulbasaur</code> (capital letters are OK)
        </li>
      </ul>

      <input
        id="pokemonNameOrId"
        name="pokemonNameOrId"
        type="text"
        value={search}
        onChange={handleSearch}
      />
      <GetPokemon query={query} error={error} />
    </main>
  );
}
