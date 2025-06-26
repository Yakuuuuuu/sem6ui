import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import history from 'connect-history-api-fallback';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    middlewareMode: false,
    setupMiddlewares: (middlewares: any) => {
      middlewares.use(history());
      return middlewares;
    },
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
