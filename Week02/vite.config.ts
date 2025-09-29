import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
//import react from '@vitejs/plugin-react'
//아니머야. 리액트를 안 쓰는 거임?

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss()
  ],
})
