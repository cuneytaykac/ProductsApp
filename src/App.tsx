import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignIn from './components/SignIn'

function App() {

  return (
    <div>
     
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
       
       
      </Routes>
    </div>
  )
}

export default App
