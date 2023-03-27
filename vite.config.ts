import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr({ include: '**/*.svg' })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@/components': `${path.resolve(__dirname, './src/components/')}`,
      '@/pages': path.resolve(__dirname, './src/pages/'),
      '@/store': `${path.resolve(__dirname, './src/store/')}`,
      '@/styles': `${path.resolve(__dirname, './src/styles/')}`,
      '@/config': `${path.resolve(__dirname, './src/config/')}`,
      '@/providers': `${path.resolve(__dirname, './src/providers/')}`,
      '@/router': `${path.resolve(__dirname, './src/router/')}`,
      '@/shared': `${path.resolve(__dirname, './src/shared/')}`,
      images: `${path.resolve(__dirname, './src/assets/images/')}`,
      svg: `${path.resolve(__dirname, './src/assets/svg/')}`,
    },
  },
});
