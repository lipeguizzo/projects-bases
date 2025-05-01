import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: '@core', replacement: resolve(__dirname, 'src', 'core') },
      {
        find: '@modules',
        replacement: resolve(__dirname, 'src', 'modules'),
      },
      {
        find: '@shared',
        replacement: resolve(__dirname, 'src', 'shared'),
      },
    ],
  },
});
