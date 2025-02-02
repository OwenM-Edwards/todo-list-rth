import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0', // Allows external access (needed for Docker)
    port: 3000,      // Match this with the Docker port
    strictPort: true,
    watch: {
      usePolling: true
    }
  },
});
