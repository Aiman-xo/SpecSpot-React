// import './App.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rgister from "./pages/Rgister"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Cart from "./pages/cart"
import Wishlist from "./pages/Wishlist"
import Induvidual from "./featured/Induvidual"
import Profile from "./featured/profile"

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
            <Route path="/profile" element={<Profile />}></Route>


          </Routes>
        </BrowserRouter>

      </Context>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        toastClassName="bg-gray-900 text-white rounded-xl shadow-lg p-4"
        bodyClassName="font-semibold text-sm"
      />


    </>
  )
}

export default App
