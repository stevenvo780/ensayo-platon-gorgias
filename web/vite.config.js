import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// SPA build (single entry: index.html). The .vercel/ project link is preserved.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
