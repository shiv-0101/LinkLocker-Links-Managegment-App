import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import BoardView from './pages/BoardView'
import Discover from './pages/Discover'
import Profile from './pages/Profile'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="mx-auto min-h-screen w-full max-w-7xl px-4 pb-10 pt-24 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/board/:id" element={<BoardView />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
