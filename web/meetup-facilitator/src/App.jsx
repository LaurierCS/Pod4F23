import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import { useRef, useState } from 'react'
import GoogleAuth from './features/GoogleAuth'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Login/>
      <Home />
      
    </Router>
  )
}

export default App