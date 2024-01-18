import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://owenkl21.github.io/ManagementSystem.io/',
  plugins: [react()],
});
