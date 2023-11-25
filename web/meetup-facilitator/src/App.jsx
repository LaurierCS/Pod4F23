import './App.css'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Activities from './pages/Activities'
import LocationComponent from './components/LocationComponent'
import TimeMain from './components/TimeMain'
import TimeHour from './components/TimeHour'
import Preferences from './pages/Preferences'
import Join from './pages/Join'

function App() {


  return (
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/preferences' element={<Preferences/>}/>
          <Route path='join/:group_id' element={<Join/>}/>
        </Routes>
      </Router>
  )
}

export default App