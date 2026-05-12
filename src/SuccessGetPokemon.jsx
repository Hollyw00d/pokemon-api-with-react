export default function SuccessGetPokemon({ query, capitalizeString }) {
  const { name, id, sprites, height, weight, types } = query;
  const nameCapitalized = capitalizeString(name);
  const frontImageUrl = sprites?.other?.home?.front_default;
  const heightCm = height * 10;
  const weightKg = weight / 10;

  return (
    <section aria-labelledby="pokemon-name">
      <h2 id="pokemon-name">{nameCapitalized}</h2>

      {frontImageUrl ? (
        <p>
          <img
            src={frontImageUrl}
            alt={nameCapitalized}
            width="250"
            height="250"
          />
        </p>
      ) : (
        <p>No image found</p>
      )}

      <ul>
        <li>
          <strong>ID:</strong>
          <br />
          {id}
        </li>
        <li>
          <strong>Height:</strong>
          <br />
          {heightCm} cm
        </li>
        <li>
          <strong>Weight:</strong>
          <br />
          {weightKg} kg
        </li>
        <li>
          <strong>Type(s):</strong>
          <ul>
            {types.map(({ type }) => (
              <li key={type.name}>{capitalizeString(type.name)}</li>
            ))}
          </ul>
        </li>
      </ul>
    </section>
  );
}
