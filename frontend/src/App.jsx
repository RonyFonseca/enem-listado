import { BrowserRouter, Routes, Route,useNavigate} from "react-router-dom"
import "./App.css"
import Register from "./Pages/LoginAndRegister/Register.jsx"
import Login from "./Pages/LoginAndRegister/Login.jsx"
import Home from "./Pages/Home/Home.jsx"
import Private from "./Pages/Private/Private.jsx"
import Create from "./Pages/Create/Create.jsx"
import Listar from "./Pages/Listar/Listar.jsx"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Private><Home /></Private>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/Create" element={<Create />}/>
        <Route path="/Register" element={<Register />}/>
        <Route path="/Listar" element={<Listar />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
