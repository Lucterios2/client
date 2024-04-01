import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  publicPath: "/new",
  base: "/new",  
  plugins: [
    vue(),
  ],
  server: {
    watch: {
      ignored: ["**/web/**"],
    },
  },  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
