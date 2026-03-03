import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { DashboardPage } from './screens/DashboardPage'
import { LoginPage } from './screens/LoginPage'
import { ScanDetailPage } from './screens/ScanDetailPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/scans/:scanId" element={<ScanDetailPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

function ThemedToaster() {
  const { isDark } = useTheme()
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: '12px',
          background: isDark ? '#101826' : '#ffffff',
          color: isDark ? '#f8fafc' : '#0f172a',
          border: `1px solid ${isDark ? '#1f2a3b' : '#dbe2ea'}`,
        },
      }}
    />
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
      <ThemedToaster />
    </ThemeProvider>
  )
}

export default App
