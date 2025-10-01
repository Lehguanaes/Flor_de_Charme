import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,       // força sempre na porta 5173
    strictPort: true, // se já estiver ocupada, dá erro em vez de mudar
  },
});
