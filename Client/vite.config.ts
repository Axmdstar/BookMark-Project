import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  "server":{
    "proxy": {
      "/api": "http://localhost:2000",
      "/login": "http://localhost:2000",
      "/browserinfo": "http://localhost:2000",
      "/getbks": "http://localhost:2000",
      "/getItems": "http://localhost:2000",
      "/signup": "http://localhost:2000",
      "/addBk": "http://localhost:2000",
      "/additem": "http://localhost:2000",
      "/delete": "http://localhost:2000",
      "/getExplore": "http://localhost:2000",
      "/like": "http://localhost:2000",
      "/LogOut": "http://localhost:2000"
    }
  },
  plugins: [react()],
})
