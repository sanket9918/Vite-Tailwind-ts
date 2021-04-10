import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(),
  VitePWA({
    mode: 'development',
    base: '/',
    manifest: ({
      "name": 'PoseDetect',
      "short_name": 'PoseDetect',
      "start_url": "/",
      "display": "standalone",
      "orientation": "portrait",
      "background_color": "#fff",
      "theme_color": "#673ab8",
      "icons": [
        {
          "src": "/assets/icons/android-chrome-192x192.png",
          "type": "image/png",
          "sizes": "192x192"
        },
        {
          "src": "/assets/icons/android-chrome-512x512.png",
          "type": "image/png",
          "sizes": "512x512"
        }
      ]
    })
  }
  )]
})
