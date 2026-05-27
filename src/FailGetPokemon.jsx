export default function FailGetPokemon({ error }) {
  return (
    <p role="alert" aria-live="assertive" aria-atomic="true">
      <strong>{error.message}</strong>
    </p>
  );
}
