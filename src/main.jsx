import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import SearchPokemon from './SearchPokemon';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchPokemon />
  </StrictMode>
);
