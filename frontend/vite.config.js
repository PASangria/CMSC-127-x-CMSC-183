import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Default Vite configuration
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8000',
    },

    host: true, 
  },
});
