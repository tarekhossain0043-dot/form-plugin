// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  base: "/wp-content/plugins/form-plugin/assets/js/react-form/dist/",
  server: {
    port: 5173,
    host: true,
  },
});
