import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
   plugins: [
      react(),
      tailwindcss(),
      VitePWA({
         registerType: "autoUpdate",
         includeAssets: ["favicon.svg", "favicon.ico", "robots.txt", "apple-touch-icon.png"],
         manifest: {
            name: "Rekap KITOL",
            short_name: "KITOL",
            start_url: "/",
            display: "standalone",
            background_color: "#FBF0D8",
            theme_color: "#0f172a",
            orientation: "portrait",
            icons: [
               {
                  src: "kitol-192.png",
                  sizes: "192x192",
                  type: "image/png",
               },
               {
                  src: "kitol-512.png",
                  sizes: "512x512",
                  type: "image/png",
               },
            ],
         },
      }),
   ],
});
