import GlobalStyle from './styles/GlobalStyle'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Onboarding from './pages/Onboarding'
import Login from './pages/Login'
import Upload from './pages/Upload'

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/Onboarding" element={<Onboarding />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Upload" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App