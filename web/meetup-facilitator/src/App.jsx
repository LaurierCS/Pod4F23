import './App.css'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Activities from './pages/Activities'
import LocationComponent from './components/LocationComponent'
import TimeMain from './components/TimeMain'
import TimeHour from './components/TimeHour'
import Join from './pages/Join'

function App() {


  return (
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/activities' element={<Activities/>} />
          <Route path='/login' element={<Login/>} />

          <Route path='location' element={<LocationComponent/>}/>

          <Route path='/time' element={<TimeMain/>}/>
          <Route path='/timehour' element={<TimeHour/>}/>
          <Route path='join/:group_id' element={<Join/>}/>

        </Routes>
      </Router>
  )
}

export default App