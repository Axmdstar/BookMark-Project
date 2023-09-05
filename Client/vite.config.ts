import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  "server":{
    "proxy": {
      "/api": "https://bookmark-devaxmed.onrender.com",
      "/login": "https://bookmark-devaxmed.onrender.com",
      "/browserinfo": "https://bookmark-devaxmed.onrender.com",
      "/getbks": "https://bookmark-devaxmed.onrender.com",
      "/getItems": "https://bookmark-devaxmed.onrender.com",
      "/signup": "https://bookmark-devaxmed.onrender.com",
      "/addBk": "https://bookmark-devaxmed.onrender.com",
      "/additem": "https://bookmark-devaxmed.onrender.com",
      "/delete": "https://bookmark-devaxmed.onrender.com",
      "/getExplore": "https://bookmark-devaxmed.onrender.com",
      "/like": "https://bookmark-devaxmed.onrender.com",
      "/LogOut": "https://bookmark-devaxmed.onrender.com"
    }
  },
  plugins: [react()],
})
