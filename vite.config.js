import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/pokemon-api-with-react/',
  build: {
    sourcemap: true
  },
  server: {
    port: 3000
  }
});
