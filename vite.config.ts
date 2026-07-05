import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';
import { createHtmlPlugin } from 'vite-plugin-html';
import { ViteMinifyPlugin } from 'vite-plugin-minify';

export default defineConfig({
  plugins: [
    react(),
    // Generate brotli and gzip compressed files
    compression({ algorithm: 'brotliCompress', ext: '.br' }),
    compression({ algorithm: 'gzip', ext: '.gz' }),
    // Inline critical CSS into index.html (optional, but we'll handle it manually)
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          // Can inject env vars if needed
        },
      },
    }),
    ViteMinifyPlugin(),
    // Optional: visualizer to see bundle size (remove in production if unwanted)
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,       // remove console.log in production
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split vendor libraries into separate chunks
          if (id.includes('node_modules')) {
            // React and ReactDOM
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            // UI libraries (e.g., tailwind, lucide, etc.)
            if (id.includes('lucide') || id.includes('tailwind')) {
              return 'vendor-ui';
            }
            // Heavy tools like pdf-lib, sharp, etc.
            if (id.includes('pdf-lib') || id.includes('sharp') || id.includes('ffmpeg')) {
              return 'vendor-heavy';
            }
            // Everything else
            return 'vendor-other';
          }
        },
        // Ensure chunks are not too large (optional)
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Increase chunk size warning limit (optional)
    chunkSizeWarningLimit: 1000,
    // Generate source maps for debugging (remove for production if you want)
    sourcemap: false,
  },
  server: {
    // Improve dev server performance
    hmr: { overlay: false },
  },
  // Optimize dependencies pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react', 'tailwindcss'],
  },
});
