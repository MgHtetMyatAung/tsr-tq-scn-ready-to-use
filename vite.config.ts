import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext", // Use modern JS for smaller bundles
    minify: "terser", // Terser often produces smaller bundles than esbuild for large projects
    terserOptions: {
      compress: {
        drop_console: true, // Clean up logs in production
        drop_debugger: true,
        passes: 2, // Advanced: run compression twice for extra shrinkage
      },
      format: {
        // Removes comments to save space
        comments: false,
      },
      mangle: true, // Shorten variable names aggressively
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "table-vendor": ["@tanstack/react-table", "zod"],
          "dnd-vendor": ["@dnd-kit/core", "@dnd-kit/sortable"],
        },
      },
    },
    // Increase chunk size warning limit for large logic files
    chunkSizeWarningLimit: 1000,
  },
});
