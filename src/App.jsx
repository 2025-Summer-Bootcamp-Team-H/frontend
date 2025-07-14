import GlobalStyle from './styles/GlobalStyle'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Onboarding from './pages/Onboarding'

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/Onboarding" element={<Onboarding />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
