import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path"; 
import circleDependency from "vite-plugin-circular-dependency";
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    circleDependency({
      outputFilePath: "./circleDep",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
