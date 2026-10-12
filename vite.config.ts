import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  // Only intentionally public values may be replaced in browser code.
  envPrefix: ['VITE_PUBLIC_', 'VITE_APPLE_MUSIC_DEVELOPER_TOKEN', 'VITE_SPOTIFY_CLIENT_ID'],
  base: '/',
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          gsap: ['gsap'],
          icons: ['lucide-react']
        }
      }
    }
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script-defer',
      workbox: {
        // Precache the application shell; load detail/admin chunks only when visited.
        globPatterns: ['index.html', 'assets/index-*.{js,css}', 'assets/vendor-*.js', 'assets/gsap-*.js', 'assets/icons-*.js', 'favicon-*.png', 'apple-touch-icon.png'],
        runtimeCaching: [{
          urlPattern: ({ url, sameOrigin }) => sameOrigin && url.pathname.startsWith('/assets/'),
          handler: 'CacheFirst',
          options: { cacheName: 'app-assets', expiration: { maxEntries: 80, maxAgeSeconds: 30 * 24 * 60 * 60 } },
        }],
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'favicon-32x32.png', 'favicon-16x16.png'],
      manifest: {
        name: "Aly Bouchnak - Modern Kids' Pop & Family Music",
        short_name: 'Aly Bouchnak',
        description: "Aly Bouchnak creates modern nursery rhymes and kids pop songs for toddlers and preschoolers.",
        theme_color: '#C8F0F7',
        icons: [
          {
            src: 'favicon-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: 'apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
