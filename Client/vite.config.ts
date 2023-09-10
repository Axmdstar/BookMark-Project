import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// "http://localhost:2000"
// "https://bookmark-devaxmed.onrender.com"
// const endpoint: string = "http://localhost:2000" ;
const endpoint: string = "https://bookmark-devaxmed.onrender.com" ;
export default defineConfig({
  base:"/",
  "server":{
    // origin:"https://bookmarks-devaxmed.onrender.com",
    "proxy": {
      "/api": endpoint,
      "/login": endpoint,
      "/browserinfo": endpoint,
      "/getbks": endpoint,
      "/getItems": endpoint,
      "/signup": endpoint,
      "/addBk": endpoint,
      "/additem": endpoint,
      "/delete": endpoint,
      "/getExplore": endpoint,
      "/like": endpoint,
      "/LogOut":endpoint
    }
  },
  plugins: [react()],
})
