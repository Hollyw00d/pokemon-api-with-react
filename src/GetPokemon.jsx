import FailGetPokemon from './FailGetPokemon';
import SuccessGetPokemon from './SuccessGetPokemon';

export default function GetPokemon({ data, isLoading, error }) {
  return (
    <>
      {isLoading && <p>Loading Pokémon...</p>}

      {error && <FailGetPokemon error={error} />}

      {data && <SuccessGetPokemon data={data} />}
    </>
  );
}
