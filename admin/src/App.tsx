import {Route, Routes} from 'react-router-dom'

import * as P from '@page'

import '@styles/App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<P.RootPage />} />
      <Route path="/signIn" element={<P.SignInPage />} />
    </Routes>
  )
}

export default App
