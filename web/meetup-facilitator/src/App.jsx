import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import {  useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { MyContext } from './MyContext'

function App() {

  const [isAuthorized, setIsAuthorized] = useState(false);

  return (
    <MyContext.Provider value={{ isAuthorized, setIsAuthorized }}>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='home' element={ <Home isAuthorized={isAuthorized}/>} />
        </Routes>
      </Router>
    </MyContext.Provider>
  )
}

export default App