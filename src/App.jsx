// import './App.css'
import Rgister from "./pages/Rgister"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Context from "./Context-API/context"

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'

function App() {


  return (
    <>
      <Context>


        {/* <Rgister /> */}

        <BrowserRouter>

          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Rgister />}></Route>

            <Route path="/" element={<Home />}></Route>
            <Route path="/products" element={<Products />}></Route>


          </Routes>
        </BrowserRouter>

      </Context>


    </>
  )
}

export default App
