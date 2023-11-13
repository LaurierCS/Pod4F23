import './App.css'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import LocationComponent from './components/LocationComponent'
function App() {


  return (
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='location' element={<LocationComponent/>}/>
        </Routes>
      </Router>
  )
}

export default App