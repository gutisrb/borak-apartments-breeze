
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024 // 5 MB limit
      },
      manifest: {
        name: 'Borak Apartmani - Brač',
        short_name: 'Borak Apartmani',
        description: 'Luxury seaside apartments on the island of Brač',
        theme_color: '#0C1930',
        background_color: '#FFFFFF',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/lovable-uploads/caaa6a44-547d-4ce5-9557-e33e5ed23016.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/lovable-uploads/caaa6a44-547d-4ce5-9557-e33e5ed23016.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
