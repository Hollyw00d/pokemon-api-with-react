function capitalizeString(str) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

export default function SuccessGetPokemon({ query }) {
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
          ID:
          <br />
          {id}
        </li>
        <li>
          Height: <br />
          {heightCm} cm
        </li>
        <li>
          Weight: <br />
          {weightKg} kg
        </li>
        <li>
          Type(s):
          <ul>
            {types.map((type) => (
              <li key={type.type.name}>{capitalizeString(type.type.name)}</li>
            ))}
          </ul>
        </li>
      </ul>
    </section>
  );
}
