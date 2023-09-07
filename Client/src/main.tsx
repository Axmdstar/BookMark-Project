import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { UsrContext } from './Components/context'




ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>

    
      <UsrContext>
      <App />
      </UsrContext>
    

  </React.StrictMode>,
)
