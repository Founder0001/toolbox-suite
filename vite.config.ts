import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'
import compression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    inspectAttr(),
    // Generate Brotli and Gzip compressed files
    compression({ algorithm: 'brotliCompress', ext: '.br' }),
    compression({ algorithm: 'gzip', ext: '.gz' }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,   // remove console.log in production
        drop_debugger: true,
      },
    },
    sourcemap: false,         // disable source maps for smaller bundles
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split vendor libraries into separate chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('lucide') || id.includes('tailwind') || id.includes('class-variance-authority')) {
              return 'vendor-ui';
            }
            if (id.includes('pdf-lib') || id.includes('pdfjs') || id.includes('@imgly/background-removal')) {
              return 'vendor-heavy';
            }
            return 'vendor-other';
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react', 'next-themes', 'tailwindcss'],
  },
});
