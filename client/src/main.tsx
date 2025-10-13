import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {AuthProvider, CommunityProvider, UrlProvider} from '@context'

import {store} from '@store'

import App from './App.tsx'

import '@styles/index.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <UrlProvider>
        <AuthProvider>
          <CommunityProvider>
            <App />
          </CommunityProvider>
        </AuthProvider>
      </UrlProvider>
    </Provider>
  </BrowserRouter>
)
