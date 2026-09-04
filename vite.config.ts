import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",
  plugins: [react({ compiler: true }), tailwindcss()],
  build: {
    target: "es2022",
    cssMinify: "lightningcss",
    reportCompressedSize: true,
  },
});
