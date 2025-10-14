import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {AuthProvider, ClubProvider, CommunityProvider, DocumentProvider, SocketProvider, UrlProvider} from '@context'

import {store} from '@store'

import App from './App.tsx'

import '@styles/index.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <UrlProvider>
        <AuthProvider>
          <SocketProvider>
            <CommunityProvider>
              <ClubProvider>
                <DocumentProvider>
                  <App />
                </DocumentProvider>
              </ClubProvider>
            </CommunityProvider>
          </SocketProvider>
        </AuthProvider>
      </UrlProvider>
    </Provider>
  </BrowserRouter>
)
