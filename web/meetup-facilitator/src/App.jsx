import './App.css'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import LocationComponent from './components/LocationComponent'

import TimeMain from './components/TimeMain'
import TimeHour from './components/TimeHour'

function App() {


  return (
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />

          <Route path='location' element={<LocationComponent/>}/>

          <Route path='/time' element={<TimeMain/>}/>
          <Route path='/timehour' element={<TimeHour/>}/>

        </Routes>
      </Router>
  )
}

export default App