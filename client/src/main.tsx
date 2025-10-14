import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {AuthProvider, ChatProvider, ClubProvider, CommunityProvider, DocumentProvider, SocketProvider, UrlProvider} from '@context'

import {store} from '@store'

import App from './App.tsx'

import '@styles/index.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <UrlProvider>
        <SocketProvider>
          <AuthProvider>
            <CommunityProvider>
              <ClubProvider>
                <ChatProvider>
                  <DocumentProvider>
                    <App />
                  </DocumentProvider>
                </ChatProvider>
              </ClubProvider>
            </CommunityProvider>
          </AuthProvider>
        </SocketProvider>
      </UrlProvider>
    </Provider>
  </BrowserRouter>
)
