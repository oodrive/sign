// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  server: {
    host: true,
    proxy: {
      '/api': {
        target: "http://localhost:5171",  //if you want to run it on docker change it to "http://172.22.0.3:5171", or the default port and ip adresse on your docker .
        changeOrigin: true,
        secure: false, // Set this to false if the target server uses a self-signed certificate
        logLevel: 'debug',
      },
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': './src', // Assuming './src' is the correct relative path to your source directory
    },
  },
});