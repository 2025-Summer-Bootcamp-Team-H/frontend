import GlobalStyle from './styles/GlobalStyle'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Onboarding from './pages/Onboarding'
import Login from './pages/Login'
import Upload from './pages/Upload'
import Receipt_edit from './pages/Receipt_edit'
import Complete from './pages/Complete'
import Analysis from './pages/Analysis'
import Diagnosis_edit from './pages/Diagnosis_edit'
import Signup from './pages/Signup'
import Management from './pages/Management'
import Report from './pages/Report'

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        {/* 루트 경로 - 기본 페이지로 리다이렉트 */}
        <Route path="/" element={<Navigate to="/onboarding" replace />} />

        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/receipt_edit" element={<Receipt_edit />} />
        <Route path="/complete" element={<Complete />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/diagnosis_edit" element={<Diagnosis_edit />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/management" element={<Management />} />
        <Route path="/report" element={<Report />} />
        <Route path="/report/:id" element={<Report />} />

        <Route path="*" element={<Navigate to="/onboarding" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
