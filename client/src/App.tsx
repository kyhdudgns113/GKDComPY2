import {Route, Routes} from 'react-router-dom'

import {Template} from './template'

import * as P from '@page'

import '@styles/App.css'
import '@styles/App.scss'
import '@styles/colorAngles.scss'

function App() {
  return (
    <Routes>
      <Route path="/" element={<P.RootPage />} />

      <Route path="/client/*" element={<Template />}>
        <Route index element={<P.ClientRootPage />} />

        <Route path="main" element={<P.ClientMainPage />} />

        <Route path="entireMember" element={<P.EntireMemberPage />} />

        <Route path="commonDoc" element={<P.ClientCommDocPage />} />

        <Route path="club/discuss/:clubOId" element={<P.ClubDiscussPage />} />
        <Route path="club/member/:clubOId" element={<P.ClubMemberPage />} />
        <Route path="club/record/:clubOId" element={<P.ClubRecordPage />} />
        <Route path="club/record/:clubOId/:weekOId" element={<P.ClubRecordPage />} />

        <Route path="*" element={<P.NullPage />} />
      </Route>

      <Route path="/signIn" element={<P.SignInPage />} />
      <Route path="/signUp" element={<P.SignUpPage />} />
      <Route path="*" element={<P.NullPage />} />
    </Routes>
  )
}

export default App
