import {Route, Routes} from 'react-router-dom'

import * as P from '@page'

import '@styles/App.css'
import {Template} from './template'

function App() {
  return (
    <Routes>
      <Route path="/" element={<P.RootPage />} />
      <Route path="/client" element={<Template />}>
        <Route path="*" element={<P.NullPage />} />
      </Route>
      <Route path="*" element={<P.NullPage />} />
    </Routes>
  )
}

export default App
