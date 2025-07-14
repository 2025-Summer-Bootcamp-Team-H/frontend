import GlobalStyle from './styles/GlobalStyle'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Onboarding from './pages/Onboarding/Onboarding'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/Onboarding" element={<Onboarding />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
