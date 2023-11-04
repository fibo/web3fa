import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
       global: "globalThis",
     },
  plugins: [react()],
    resolve: {
    alias: {
      process: "process/browser",
      util: "util",
    },
  },
  server: {
    port: 8000,
  },
});
