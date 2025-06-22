import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  tailwindcss(),],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks for core libraries
          if (id.includes('node_modules')) {
            // Separate large libraries into their own chunks
            if (id.includes('exceljs')) return 'exceljs';
            if (id.includes('react-router')) return 'react-router';
            if (id.includes('@tanstack/react-table')) return 'tanstack-table';
            if (id.includes('@tanstack/react-query')) return 'react-query';
            if (id.includes('react-hook-form')) return 'react-hook-form';
            if (id.includes('recharts')) return 'recharts';
            if (id.includes('lucide-react')) return 'lucide-react';
            if (id.includes('sonner')) return 'sonner';
            if (id.includes('zod')) return 'zod';
            if (id.includes('@hookform/resolvers')) return 'zod';

            // Core React libraries
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            return 'vendor';
          }
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
})
