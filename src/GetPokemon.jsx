import FailGetPokemon from './FailGetPokemon';
import SuccessGetPokemon from './SuccessGetPokemon';

export default function GetPokemon({ data, error }) {
  return (
    <>
      {error && <FailGetPokemon error={error} />}

      {data && <SuccessGetPokemon data={data} />}
    </>
  );
}
