import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths for Vercel deployment
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Exclude node_modules path checks for local files
          if (!id.includes('node_modules')) {
            return undefined; // Let Vite handle local file chunks automatically
          }

          // Core React libraries
          if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
            return 'vendor';
          }

          // Router
          if (id.includes('react-router')) {
            return 'vendor';
          }

          // Image processing libraries
          if (id.includes('react-dropzone') || id.includes('browser-image-compression')) {
            return 'image-processing';
          }

          // HTTP client
          if (id.includes('axios')) {
            return 'http';
          }

          // Canvas libraries
          if (id.includes('html2canvas')) {
            return 'canvas';
          }

          // Everything else from node_modules
          return 'vendor';
        },
      },
    },
    chunkSizeWarningLimit: 600,
    // Enable source maps for better debugging
    sourcemap: true,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-dropzone',
      'browser-image-compression'
    ]
  }
})
