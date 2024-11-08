import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Navbar from './pages/Navbar/Navbar'
import Todo from './pages/Todo'
import Add from "./pages/Add";
import ClientProfile from './pages/ClientProfile'
import DiseasePredictor from './pages/DiseasePredictor'
import Food from './pages/Food'
import CareTaker from './pages/CareTaker'
import ElderlyPage from './pages/Elderlys'
import LobbyScreen from './pages/LobbyScreen'
import Room from './pages/Room'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/todo' element={<Todo />} />
        <Route path='/add-task' element={<Add />} />
        <Route path='/profile' element={<ClientProfile />} />
        <Route path='/health' element={<DiseasePredictor />} />
        <Route path='/food' element={<Food />} />
        <Route path='/caretaker' element={<CareTaker />} />
        <Route path='/elderly' element={<ElderlyPage />} />
        <Route path='/lobby' element={<LobbyScreen />} />
        <Route path='/room/:roomId' element={<Room />} />
      </Routes>
    </Router>
  )
}

export default App
