import './App.css'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Activities from './pages/Activities'
import LocationComponent from './components/LocationComponent'
import TimeMain from './components/TimeMain'
import TimeHour from './components/TimeHour'
import Recommendation from './components/Recommendation'
import Preferences from './pages/Preferences'
import Join from './pages/Join'

function App() {


  return (
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/activities' element={<Activities/>} />
          <Route path='/recommendations/:group_id' element={<Recommendation/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/preferences/:group_id' element={<Preferences/>}/>
          <Route path='/join/:group_id' element={<Join/>}/>

          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
  )
}

export default App