import { BrowserRouter, Routes, Route,useNavigate} from "react-router-dom"
import "./App.css"
import Register from "./Pages/LoginAndRegister/Register.jsx"
import Login from "./Pages/LoginAndRegister/Login.jsx"
import Home from "./Pages/Home/Home.jsx"
import Private from "./Pages/Private/Private.jsx"
import Create from "./Pages/Create/Create.jsx"
import Listar from "./Pages/Listar/Listar.jsx"
import Detalhes from "./Pages/Detalhes/Detalhes.jsx"
import {UserProvider} from "./Context/UseContext.jsx"
import {ProvaProvider} from "./Context/ProvaContext.jsx"
import Header from "./Components/Header/Header.jsx"
import Message from "./Components/Message/Message.jsx"

function App() {
  return (
    <BrowserRouter>
    <UserProvider>
    <ProvaProvider>
      <Header />
      <Message />
      <Routes>
        <Route path="/" element={<Private><Home /></Private>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/Create" element={<Create />}/>
        <Route path="/Register" element={<Register />}/>
        <Route path="/Detalhes/:id" element={<Detalhes />}/>
        <Route path="/Listar/:id" element={<Listar />}/>
      </Routes>
    </ProvaProvider>
    </UserProvider>
    </BrowserRouter>
  )
}

export default App
