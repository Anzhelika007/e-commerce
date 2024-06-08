/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sass from 'vite-plugin-sass-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    sass(), 
  ],
  base: process.env.NODE_ENV === 'production' ? '/e-commerce-deployment' : '/e-commerce',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/__tests__/setup.ts'],
  },
})
