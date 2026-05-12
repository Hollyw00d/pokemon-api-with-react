import FailGetPokemon from './FailGetPokemon';
import SuccessGetPokemon from './SuccessGetPokemon';

function capitalizeString(str = '') {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

export default function GetPokemon({ query, error }) {
  return (
    <>
      <div role="alert" aria-live="assertive" aria-atomic="true">
        {error && <FailGetPokemon error={error} />}
      </div>
      {query?.name && (
        <>
          <div role="alert" aria-live="assertive" className="sr-only">
            {capitalizeString(query.name)} Pokemon found!
          </div>
          <SuccessGetPokemon
            query={query}
            capitalizeString={capitalizeString}
          />
        </>
      )}
    </>
  );
}
