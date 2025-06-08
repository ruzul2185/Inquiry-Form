import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host:"0.0.0.0",
    proxy: {
      '/api': {
        target: '*', // Replace with your backend URL
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  }
})