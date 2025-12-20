import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import AssistentPage from './pages/AssistentPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

const App = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assistent" element={<AssistentPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App