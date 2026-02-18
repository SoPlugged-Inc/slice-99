import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      // https: true, // Uncomment to enable HTTPS if needed for Stripe testing locally
    },
    plugins: [react()],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          creators: path.resolve(__dirname, 'creators/index.html'), // This now serves as the template for /slug/index.html
          thank_you: path.resolve(__dirname, 'creators/thank-you.html'),
        },
      },
    }
  };
});
