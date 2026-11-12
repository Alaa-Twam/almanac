import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import BriefingPage from './pages/BriefingPage'
import NotFoundPage from './pages/NotFoundPage'
import { getTodayString } from './utils/date'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="/"
          element={<Navigate to={`/date/${getTodayString()}`} replace />}
        />
        <Route path="/date/:date" element={<BriefingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
