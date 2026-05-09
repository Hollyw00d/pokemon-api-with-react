import { useState, useRef, useMemo, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import GetPokemon from "./GetPokemon";

export default function SearchPokemon() {
  const controllerRef = useRef();
  const [query, setQuery] = useState(null);
  const debouncedQuery = useDebounce(query);
  const [result, setResult] = useState("");
  const debouncedResult = useDebounce(result, 700);
  const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

  const fetchPokemon = useMemo(
    () => async () => {
      if (debouncedQuery === null) return;

      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      controllerRef.current = new AbortController();
      const { signal } = controllerRef.current;

      try {
        if (debouncedQuery.length < 1) {
          throw new Error("Please enter a Pokemon name or ID.");
        }

        const response = await fetch(`${baseUrl}${debouncedQuery}`, { signal });
        const json = await response.json();
        setResult(json);
      } catch (error) {
        if (debouncedQuery.length < 1) {
          setResult("Please enter a Pokemon name or ID.");
        } else {
          setResult("No Pokemon found! Please search again.");
        }
      }
    },
    [debouncedQuery]
  );

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const pokemon_name_or_id = e.target.elements.pokemon_name_or_id.value
  //     .toLocaleLowerCase()
  //     .trim();
  //   setQuery(pokemon_name_or_id);
  // };

  useEffect(() => {
    if (debouncedQuery !== null) fetchPokemon();
  }, [debouncedQuery, fetchPokemon]);

  return (
    <>
      <div>
        <label htmlFor="pokemon_name_or_id">
          <p>
            Search by Pokemon Name or ID
            <br />(
            <a href="https://pokemondb.net/pokedex/national" target="_blank">
              see list
            </a>
            )
          </p>
          <p>
            <input
              id="pokemon_name_or_id"
              name="pokemon_name_or_id"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </p>
        </label>
      </div>
      <GetPokemon result={debouncedResult} />
    </>
  );
}
