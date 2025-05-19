import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/sneekers/',
  server: {
    historyApiFallback: true,  // Fixes refresh issue
  }
});
