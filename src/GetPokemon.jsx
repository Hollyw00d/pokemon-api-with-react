import SuccessGetPokemon from './SuccessGetPokemon';
import FailGetPokemon from './FailGetPokemon';

export default function GetPokemon({ query, error }) {
  if (!error && query) {
    return (
      <div>
        <SuccessGetPokemon query={query} />
      </div>
    );
  }

  if (error && !query) {
    return (
      <div>
        <FailGetPokemon error={error} />
      </div>
    );
  }

  return null;
}
