import './App.css'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Recommendation from './pages/Recommendation'
import Preferences from './pages/Preferences'
import Join from './pages/Join'
function App() {


  return (
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/preferences/:group_id' element={<Preferences/>}/>
          <Route path='/join/:group_id' element={<Join/>}/>
          <Route path='/recommendations/:group_id' element={<Recommendation/>}/>
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
  )
}

export default App