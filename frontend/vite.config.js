import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Default Vite configuration
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
});
