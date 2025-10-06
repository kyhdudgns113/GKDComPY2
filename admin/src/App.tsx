import {Route, Routes} from 'react-router-dom'

import * as P from '@page'

import '@styles/App.css'
import '@styles/AppButtons.scss'

function App() {
  return (
    <Routes>
      <Route path="/" element={<P.RootPage />} />
      <Route path="/signIn" element={<P.SignInPage />} />
      <Route path="/signUp" element={<P.SignUpPage />} />
      <Route path="*" element={<P.NullPage />} />
    </Routes>
  )
}

export default App
