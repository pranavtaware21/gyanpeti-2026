import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

/*
  GitHub Pages serves a project site from /<repo>/, not from the domain root.
  BASE_URL carries that prefix into the app so the photograph paths resolve —
  see the note in ui/Img.tsx. Override with BASE_PATH=/ when deploying to a
  root domain or a user site, so this file never has to change again.
*/
const base = process.env.BASE_PATH ?? '/gyanpeti-2026/'

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    target: 'es2020',
    cssTarget: 'safari15',
    assetsInlineLimit: 2048,
  },
})
