export default function FailGetPokemon({ error }) {
  return (
    <div role="alert" aria-live="assertive" aria-atomic="true">
      <p>
        <strong>{error}</strong>
      </p>
    </div>
  );
}
