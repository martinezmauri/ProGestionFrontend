import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@api": path.resolve(__dirname, "src/api"),
      "@components": path.resolve(__dirname, "src/components"),
      "@enum": path.resolve(__dirname, "src/enum"),
      "@helpers": path.resolve(__dirname, "src/helpers"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@interfaces": path.resolve(__dirname, "src/interfaces"),
      "@layout": path.resolve(__dirname, "src/layout"),
      "@lib": path.resolve(__dirname, "src/lib"),
      "@ui": path.resolve(__dirname, "src/ui"),
      "@views": path.resolve(__dirname, "src/views"),
      "@context": path.resolve(__dirname, "src/context"),
    },
  },
});
