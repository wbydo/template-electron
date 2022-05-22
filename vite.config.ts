import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist/renderer',
  },
  plugins: [reactRefresh(), vanillaExtractPlugin()],
});
