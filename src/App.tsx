import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import SignIn from './components/SignIn'

function App() {

  return (
    <div>
     
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/home" element={<Home />}></Route>
       
       
      </Routes>
    </div>
  )
}

export default App
