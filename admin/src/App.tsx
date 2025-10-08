import {Route, Routes} from 'react-router-dom'

import {Template} from './template'

import * as P from '@page'

import '@styles/App.css'
import '@styles/AppButtons.scss'

function App() {
  return (
    <Routes>
      <Route path="/" element={<P.RootPage />} />
      <Route path="/admin/*" element={<Template />}>
        <Route index element={<P.AdminPage />} />
      </Route>
      <Route path="/signIn" element={<P.SignInPage />} />
      <Route path="/signUp" element={<P.SignUpPage />} />
      <Route path="*" element={<P.NullPage />} />
    </Routes>
  )
}

export default App
