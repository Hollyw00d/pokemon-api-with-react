export default function SuccessGetPokemon({ query }) {
  function capitalizeString(str) {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  }

  const { name, id, sprites, height, weight, types } = query;
  const nameCapitalized = capitalizeString(name);
  const frontImageUrl = sprites.other.home.front_default;

  return (
    <div>
      <ul>
        <li>
          Name:
          <br />
          {nameCapitalized}
        </li>
        <li>
          ID:
          <br />
          {id}
        </li>
        <li>
          Image:
          <br />
          <img
            src={frontImageUrl}
            alt={nameCapitalized}
            width="250"
            height="250"
          />
        </li>
        <li>
          Height: <br />
          {height} cm
        </li>
        <li>
          Weight: <br />
          {weight} kg
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
    </div>
  );
}
