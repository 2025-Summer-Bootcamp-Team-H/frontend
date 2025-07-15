import GlobalStyle from './styles/GlobalStyle'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Onboarding from './pages/Onboarding'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
