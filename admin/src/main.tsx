import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from '@store'

import '@styles/index.css'

import App from './App.tsx'
import {AuthProvider, CommunityProvider, LogProvider} from '@context'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <CommunityProvider>
          <LogProvider>
            <App />
          </LogProvider>
        </CommunityProvider>
      </AuthProvider>
    </Provider>
  </BrowserRouter>
)
