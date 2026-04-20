import { useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CausticContext } from './context/caustic'
import CausticBackground from './components/CausticBackground'
import Home from './pages/Home'
import BlogPost from './pages/BlogPost'
import './App.css'

export default function App() {
  const intensityRef = useRef(0)

  return (
    <CausticContext.Provider value={intensityRef}>
      <BrowserRouter>
        <CausticBackground intensityRef={intensityRef} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </BrowserRouter>
    </CausticContext.Provider>
  )
}
