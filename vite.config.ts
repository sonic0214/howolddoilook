import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React libraries
          if (id.includes('react') || id.includes('react-dom')) {
            return 'vendor';
          }

          // Router
          if (id.includes('react-router')) {
            return 'router';
          }

          // Image processing libraries
          if (id.includes('react-dropzone') || id.includes('browser-image-compression')) {
            return 'image-processing';
          }

          // HTTP client
          if (id.includes('axios')) {
            return 'http';
          }

          // UI libraries and icons
          if (id.includes('lucide-react')) {
            return 'icons';
          }

          // Canvas libraries
          if (id.includes('html2canvas')) {
            return 'canvas';
          }

          // Article pages (each gets its own chunk)
          if (id.includes('/pages/')) {
            const pageName = id.split('/').pop()?.replace('.tsx', '').replace('.ts', '') || 'page';
            return `page-${pageName}`;
          }

          // Components
          if (id.includes('/components/')) {
            return 'components';
          }

          // Default chunk for everything else
          return 'utils';
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
