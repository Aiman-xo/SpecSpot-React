// import './App.css'
import Rgister from "./pages/Rgister"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Products from "./pages/Products"

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'

function App() {


  return (
    <>
      {/* <Rgister /> */}

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Rgister />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
