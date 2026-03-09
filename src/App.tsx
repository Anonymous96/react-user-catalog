import { Routes, Route, Navigate } from 'react-router-dom'
import UsersPage from './pages/UsersPage'
import ErrorBoundary from './components/ErrorBoundary'

export default function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Routes>
          <Route path="/users" element={<UsersPage />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </div>
    </ErrorBoundary>
  )
}
