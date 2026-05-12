import FailGetPokemon from './FailGetPokemon';
import SuccessGetPokemon from './SuccessGetPokemon';

export default function GetPokemon({ query, error }) {
  if (error) {
    return <FailGetPokemon error={error} />;
  }

  if (query) {
    return <SuccessGetPokemon query={query} />;
  }

  return null;
}
