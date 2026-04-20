import path from "path"
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite' // 1. Import loadEnv

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: true,
      allowedHosts: [
        'uncomplaining-irritative-ranee.ngrok-free.dev',
        'frontend-nine-zeta-40.vercel.app'
      ],
      port: 5173,
      proxy: {
        '/api': {
          target: env.VITE_BACKEND_URL, 
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
})