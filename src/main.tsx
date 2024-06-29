import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ThemeContext from './context/ThemeContext.ts';
 
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeContext.Provider value='dark'>
      <Suspense fallback="Cargando...">
        <App />
      </Suspense>
    </ThemeContext.Provider>
   </React.StrictMode>,
)
