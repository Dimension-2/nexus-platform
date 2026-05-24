import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  // No root setting needed, Vite will use the 'client' folder automatically
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        // Points directly to the index.html in your main client folder
        main: resolve(__dirname, "index.html"),
        // Points to your new dashboard inside src/pages
        dashboard: resolve(__dirname, "src/pages/dashboard.html"),
      },
    },
  },
});
