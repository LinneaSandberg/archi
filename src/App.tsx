import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import NotFoundPage from './pages/NotFoundPage'
import AssistentPage from './pages/AssistentPage'

const App = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assistent" element={<AssistentPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App