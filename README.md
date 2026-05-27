# Display a Pokemon by ID or Name using React

This React app uses the [PokéAPI](https://pokeapi.co/docs/v2#pokemon) to display a pokemon by ID or name from a text input at:  
[https://hollyw00d.github.io/pokemon-api-with-react/](https://hollyw00d.github.io/pokemon-api-with-react/)

Other technologies used include:

- [TanStack Query](https://tanstack.com/query/latest) (formerly React Query)
- A custom [useDebounce](https://github.com/Hollyw00d/pokemon-api-with-react/blob/main/src/hooks/useDebounce.js) hook to delay fetching a Pokémon until after after the user has finished time for some time, to avoid unnecessary network requests
- Accessibility features including <code>role="alert"</code> to show when fetching Pokémon has failed or succeeded, and I confirmed this by testing with [VoiceOver screenreader](https://en.wikipedia.org/wiki/VoiceOver) on Safari with my Mac

Below is a screenshot of searching for `Bulbasaur`:  
![Screenshot of searching for Bulbasaur](./public/assets/images/pokeapi-screenshot-example.png)
