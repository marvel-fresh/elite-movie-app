import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const api = env.API_BASE_URL
  const apiKey = env.API_KEY
  const imageUrl = env.IMAGE_URL

  return {
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: api,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          headers: {
            'Authorization': `Bearer ${apiKey}`,
          },
        },
      },
    },
    define: {
      'import.meta.env.VITE_IMAGE_URL': JSON.stringify(imageUrl),
    },
  }
})
