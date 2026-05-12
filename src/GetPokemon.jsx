import FailGetPokemon from './FailGetPokemon';
import SuccessGetPokemon from './SuccessGetPokemon';

export default function GetPokemon({ query, error }) {
  return (
    <>
      {error && <FailGetPokemon error={error} />}

      {query && <SuccessGetPokemon query={query} />}
    </>
  );
}
