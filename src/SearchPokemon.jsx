import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useDebounce from './hooks/useDebounce';
import GetPokemon from './GetPokemon';
import './SearchPokemon.css';

export default function SearchPokemon() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search.trim().toLowerCase(), 1000);
  const pokeApiBaseUrl = 'https://pokeapi.co/api/v2/pokemon/';

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  async function fetchPokemon(nameOrId) {
    try {
      const res = await fetch(
        `${pokeApiBaseUrl}${encodeURIComponent(nameOrId)}`,
        {
          signal: AbortSignal.timeout(5000)
        }
      );

      if (!res.ok) {
        throw new Error('Pokémon not found');
      }

      return res.json();
    } catch (error) {
      if (error.name === 'TimeoutError') {
        throw new Error(
          'Request timed out. No Pokémon found! Please search again.',
          { cause: error }
        );
      } else {
        throw new Error('No Pokémon found! Please search again.', {
          cause: error
        });
      }
    }
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['pokemn', debouncedSearch],
    queryFn: () => fetchPokemon(debouncedSearch),
    enabled: !!debouncedSearch,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60
  });

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
      <GetPokemon data={data} isLoading={isLoading} error={error} />
    </main>
  );
}
