// import './App.css'
import Rgister from "./pages/Rgister"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Cart from "./pages/cart"
import Wishlist from "./pages/Wishlist"
import Induvidual from "./featured/Induvidual"
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
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/wishlist" element={<Wishlist />}></Route>
            <Route path="/induvidual/:id" element={<Induvidual />}></Route>


          </Routes>
        </BrowserRouter>

      </Context>


    </>
  )
}

export default App
