import FailGetPokemon from './FailGetPokemon';
import SuccessGetPokemon from './SuccessGetPokemon';

export default function GetPokemon({ query, error }) {
  return (
    <>
      <div role="alert" aria-atomic="true">
        {error && <FailGetPokemon error={error} />}
      </div>
      {query && <SuccessGetPokemon query={query} />}
    </>
  );
}
