import './App.css'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Activities from './pages/Activities'

function App() {


  return (
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/activities' element={<Activities/>} />
          <Route path='/login' element={<Login/>} />
          
        </Routes>
      </Router>
  )
}

export default App