import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Navbar from './pages/Navbar/Navbar'
import Todo from './pages/client/Todo'
import Add from "./pages/client/Add";
import ClientProfile from './pages/client/ClientProfile'
import DiseasePredictor from './pages/DiseasePredictor'
import Food from './pages/Food'
import CareTaker from './pages/CareTaker'
import ElderlyPage from './pages/Elderlys'
// import LobbyScreen from './pages/LobbyScreen'
// import Room from './pages/Room'
import CaretakerProfile from './pages/caretaker/Profile'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />

        {/* auth routes  */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* client routes */}
        <Route path='/todo' element={<Todo />} />
        <Route path='/add-task' element={<Add />} />
        <Route path='/profile' element={<ClientProfile />} />
        <Route path='/health' element={<DiseasePredictor />} />
        <Route path='/food' element={<Food />} />
        {/* <Route path='/lobby' element={<LobbyScreen />} /> */}
        {/* <Route path='/room/:roomId' element={<Room />} /> */}
        <Route path='/caretaker' element={<CareTaker />} />

        {/* caretaker routes  */}
        <Route path='/caretaker-profile' element={<CaretakerProfile />} />
        <Route path='/elderly' element={<ElderlyPage />} />
      </Routes>
    </Router>
  )
}

export default App
