import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/base.css'
import './styles/scenes.css'
import App from './App'
import { lockViewportHeight } from './viewport'
import { warmImages } from './engine/warmImages'

/*
  Before anything renders: every section is sized from --vh, so it has to
  exist or the stages collapse to nothing.
*/
lockViewportHeight()

document.getElementById('boot')?.remove()

// Pull the photographs in while the visitor is still on the first screen.
addEventListener('load', warmImages)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
