import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, "src/main.js"),
      formats: ["es", "cjs"],
      name: "tour-guide-turbham",
      fileName: (format) => `tour-guide-turbham.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          Vue: "vue",
        },
        // entryFileNames: '[name].[format].js'
      },
    },
  },
  plugins: [vue()],
});
