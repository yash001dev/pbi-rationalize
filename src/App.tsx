import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ClusterView from './pages/ClusterView'
import Comparison from './pages/Comparison'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cluster" element={<ClusterView />} />
        <Route path="/comparison" element={<Comparison />} />
      </Routes>
    </Router>
  )
}

export default App
