import React, { useEffect, useState } from 'react'
import Navbar from '../Reusables/navbar'
import { toast } from "react-toastify";
// import { useContext } from 'react'
// import { searchContext } from '../Context-API/context'
import '../mystyle.css'
import axios from 'axios'
import { data, Link, useNavigate } from 'react-router-dom';

function Cart() {
    // let { addtocart, setAddtocart } = useContext(searchContext);
    let [userDetail, setuserDetails] = useState({ cart: [] });
    let nav = useNavigate()
    // let [count, setCount] = useState(0);

    //shipping sharge

    const shipping = 10;



    async function RemoveCartItem(removeInd, removedProduct) {
        let userId = localStorage.getItem("userId")
        toast.error(`${removedProduct} is removed from your cart`)
        const filtered = userDetail.cart.filter((val) => {

            return val.id !== removeInd
        })
        setuserDetails({ cart: filtered })

        await axios.patch(`http://localhost:3000/users/${userId}`, {
            cart: filtered
        });



    }
    let userId = localStorage.getItem("userId")
    useEffect(() => {

        async function getCart() {
            const resp = await axios.get(`http://localhost:3000/users/${userId}`);
            const userDetails = await resp.data;
            setuserDetails(userDetails)
        }
        getCart()
    }, [])

    async function IncreCart(productId) {
        const updatedCart = userDetail.cart.map((cartItems) => {
            return cartItems.id === productId ? { ...cartItems, cartQty: cartItems.cartQty + 1 } : cartItems
        })


        setuserDetails(pre => ({ ...pre, cart: updatedCart }))
        await axios.patch(`http://localhost:3000/users/${userId}`, {
            cart: updatedCart
        });
    }

    async function DecreCart(productId) {
        const updatedCart = userDetail.cart.map((cartItems) => {
            // return cartItems.id === productId ? { ...cartItems, cartQty: cartItems.cartQty - 1 } : cartItems
            if (cartItems.id === productId) {
                return {
                    ...cartItems,
                    cartQty: cartItems.cartQty > 1 ? cartItems.cartQty - 1 : 1
                }
            }
            else {
                return cartItems
            }
        })
        console.log(updatedCart)

        setuserDetails(pre => ({ ...pre, cart: updatedCart }))
        await axios.patch(`http://localhost:3000/users/${userId}`, {
            cart: updatedCart
        });
    }

    async function GetOrders() {
        const resp = await axios.get(`http://localhost:3000/users/${userId}`);
        const data = resp.data;
    }

    //printing total logic

    const total = userDetail.cart.reduce((acc, val) => {
        const itemTotal = val.price * val.cartQty;
        return ((acc + itemTotal + (itemTotal * 0.10)))
    }, 0);

    const grandTotal = (total + shipping).toFixed(2);

    return (



        <div>
            <Navbar />

            <div className="">
                <h2 className="text-center mt-4 font-bold text-xl font-[verdana] text-gray-600">
                    Cart products:
                </h2>
            </div>

            {/* ✅ Wrap products + order summary together */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 px-4 md:px-10 ">
                {/* ✅ Products Section */}
                <div className="flex-1">
                    {userDetail?.cart?.length === 0 ? (
                        <div className="flex justify-center items-center mt-4 font-bold text-2xl font-[arial] text-red-500 h-100">
                            <p>Cart Empty!</p>
                        </div>
                    ) : (
                        userDetail.cart.map((val) => {
                            return (
                                <div className="flex justify-center" key={val.id}>
                                    <div className="flex flex-col md:flex-row cartStyle mb-10 p-6 gap-12 w-full md:h-70 mt-10 max-w-3xl rounded-xl shadow-lg bg-white">
                                        {/* Image Section */}
                                        <div className="flex justify-center items-center w-full md:w-1/2">
                                            <Link to={`/induvidual/${val.id}`}> <img
                                                src={val.image}
                                                alt={val.model}
                                                className="w-50 rounded-xl shadow-md"
                                            /></Link>
                                        </div>

                                        {/* Text Section */}
                                        <div className="flex justify-center items-center w-full md:w-1/2 text-center">
                                            <div>
                                                <h5 className="text-xl font-bold text-gray-800 mb-2">
                                                    {val.brand}
                                                </h5>
                                                <p className="text-gray-600 font-[verdana] text-sm mb-1">
                                                    Model: {val.model}
                                                </p>
                                                <p className="text-gray-600 font-[verdana] text-sm mb-1">
                                                    Type: {val.type}
                                                </p>

                                                <p className="text-gray-600 font-[verdana] text-sm mb-1">
                                                    Frame: {val.frame_material}
                                                </p>
                                                <p className="text-gray-600 font-[verdana] text-sm mb-1">
                                                    Original Price:{" "}
                                                    <span className="text-green-600">$ {val.price}</span>
                                                </p>
                                                <p className="text-gray-600">
                                                    Current Price:
                                                    <span className="text-green-600 text-lg font-semibold">
                                                        {" "}
                                                        $ {(val.price * val.cartQty).toFixed(2)}
                                                    </span>
                                                </p>
                                                <div className="flex justify-center mt-4">
                                                    <button
                                                        className="bg-gray-200 text-gray-700 text-xs font-bold px-3 rounded hover:bg-gray-300 hover:text-white cursor-pointer me-2"
                                                        onClick={() => DecreCart(val.id)}
                                                    >
                                                        -
                                                    </button>

                                                    <p>{val.cartQty}</p>
                                                    <button
                                                        className="bg-gray-200 text-gray-700 text-xs font-bold px-3 rounded hover:bg-gray-300 hover:text-white cursor-pointer ms-2"
                                                        onClick={() => IncreCart(val.id)}
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <div className="flex gap-4 justify-center mt-4">
                                                    {/* <button className="bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer" onClick={() => nav('/orders')}>
                                                        Buy Now
                                                    </button> */}
                                                    <button
                                                        className="bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
                                                        onClick={() => RemoveCartItem(val.id, val.brand)}
                                                    >
                                                        Remove from Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* ✅ Order Summary Section */}
                {userDetail.cart.length !== 0 && <div className="w-full md:w-1/3  ">
                    <div className="max-w-md mx-auto md:mx-0 bg-white rounded-lg shadow-lg p-6 mt-6 md:mt-0  ">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                        {/* Order Items (static design for now) */}

                        <div className="space-y-3 text-sm ">

                            {userDetail.cart.map((val) => {
                                return <div className='flex justify-between' key={val.id}>
                                    <div>{val.brand} ({val.cartQty})</div>
                                    <div>{val.price * val.cartQty}</div>
                                </div>
                            })}



                        </div>

                        <hr className="my-4" />

                        {/* Totals */}
                        <div className="flex justify-between text-sm mb-2">
                            <span>Subtotal</span>
                            <span>${userDetail.cart.reduce((acc, val) => {
                                return acc + val.cartQty * val.price
                            }, 0)}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                            <span>Tax (10%)</span>
                            <span>{userDetail.cart.reduce((acc, val) => {
                                const itemTotal = val.price * val.cartQty;
                                return (acc + (itemTotal * 0.10))
                            }, 0).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                            <span>Shipping</span>
                            <span>$10.00</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>{grandTotal}</span>
                        </div>

                        {/* Checkout Button */}
                        <button className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 cursor-pointer" onClick={() => nav('/orders')}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>}

            </div>


        </div >

    )
}

export default Cart