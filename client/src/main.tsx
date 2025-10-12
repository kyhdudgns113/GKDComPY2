import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {AuthProvider, CommunityProvider} from '@context'

import {store} from '@store'

import App from './App.tsx'

import '@styles/index.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <Provider store={store}>
        <CommunityProvider>
          <App />
        </CommunityProvider>
      </Provider>
    </AuthProvider>
  </BrowserRouter>
)
