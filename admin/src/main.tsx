import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'

import App from './App.tsx'

import * as CT from '@context'

import '@styles/index.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <CT.AuthProvider>
      <App />
    </CT.AuthProvider>
  </BrowserRouter>
)
