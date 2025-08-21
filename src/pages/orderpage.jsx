import React, { useEffect, useReducer, useState } from 'react'
// import { useState } from 'react';
import Navbar from '../Reusables/navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



function reducerFun(prev, action) {
    switch (action.type) {
        case 'get-name':
            return {
                ...prev,
                fullName: action.payLoad
            }
        case 'get-address':
            return {
                ...prev,
                address: action.payLoad
            }

        case 'get-phone':
            return {
                ...prev,
                phone: action.payLoad
            }

        case 'get-city':
            return {
                ...prev,
                city: action.payLoad
            }

        case 'get-state':
            return {
                ...prev,
                region: action.payLoad
            }

        case 'get-pincode':
            return {
                ...prev,
                pin: action.payLoad
            }

        case 'get-country':
            return {
                ...prev,
                country: action.payLoad
            }

        case 'error':
            return {
                ...prev,
                error: action.payLoad
            }
    }
}
function ShippingPage() {
    let [userObject, SetUserObject] = useState([]);
    let nav = useNavigate();
    let [state, dispatch] = useReducer(reducerFun, {})
    let userId = localStorage.getItem("userId");
    const shipping = 10;

    useEffect(() => {
        async function GetCartItems() {
            const resp = await axios.get(`http://localhost:3000/users/${userId}`);
            const userObj = resp.data;
            SetUserObject(userObj.cart);
        }
        GetCartItems();
    }, [])

    async function PostShippingDetails() {

        if (state.fullName && state.address && state.phone && state.city && state.region && state.pin && state.country !== '') {
            const idNo = Math.floor(Math.random() * 1000);

            const resp = await axios.get(`http://localhost:3000/users/${userId}`);
            const data = await resp.data;

            await axios.patch(`http://localhost:3000/users/${userId}`, {
                orders: [...data.orders, {
                    id: idNo,
                    products: data.cart,
                    shipping: {
                        fullname: state.fullName,
                        mainAddress: state.address,
                        phone: state.phone,
                        city: state.city,
                        region: state.region,
                        pin: state.pin,
                        country: state.country
                    }
                }]
            })


            // await axios.patch(`http://localhost:3000/users/${userId}`, {
            //     shipping: {
            //         fullname: state.fullName,
            //         mainAddress: state.address,
            //         phone: state.phone,
            //         city: state.city,
            //         region: state.region,
            //         pin: state.pin,
            //         country: state.country
            //     }
            // })

            await axios.patch(`http://localhost:3000/users/${userId}`, {
                cart: []

            })
            toast.success('ordered successfully')
            nav('/orders/confirmed')
        }
        else {
            dispatch({
                type: 'error',
                payLoad: 'fill your full address please !'
            })
        }




        console.log(state);

    }



    //printing total logic

    const total = userObject.reduce((acc, val) => {
        const itemTotal = val.price * val.cartQty;
        return ((acc + itemTotal + (itemTotal * 0.10)))
    }, 0);

    const grandTotal = (total + shipping).toFixed(2);
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <Navbar />

            <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto p-8">
                {/* Shipping Address */}
                <div className="flex-1 bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Shipping Address
                    </h2>
                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="John Doe"
                                onChange={(e) => dispatch({
                                    type: 'get-name',
                                    payLoad: e.target.value
                                })} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Address
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="Street address"
                                onChange={(e) => dispatch({
                                    type: 'get-address',
                                    payLoad: e.target.value
                                })} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="Phone"
                                onChange={(e) => dispatch({
                                    type: 'get-phone',
                                    payLoad: e.target.value
                                })} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    City
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="City"
                                    onChange={(e) => dispatch({
                                        type: 'get-city',
                                        payLoad: e.target.value
                                    })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    State/Province
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="State"
                                    onChange={(e) => dispatch({
                                        type: 'get-state',
                                        payLoad: e.target.value
                                    })} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    ZIP/Postal Code
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="12345"
                                    onChange={(e) => dispatch({
                                        type: 'get-pincode',
                                        payLoad: e.target.value
                                    })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Country
                                </label>
                                <select className="w-full px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" value={state.country} onChange={(e) => dispatch({
                                    type: 'get-country',
                                    payLoad: e.target.value
                                })}>
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>United Kingdom</option>
                                    <option>Australia</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <p className='text-red-600 text-base text-center mt-2'>{state.error}</p>
                </div>

                {/* Payment Section */}
                <div className="flex-1 bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Payment Method
                    </h2>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Card Number
                            </label>
                            <input
                                className="w-full px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="1234 5678 9012 3456"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Expiry Date
                                </label>
                                <input
                                    className="w-full px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="MM/YY"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    CVV
                                </label>
                                <input
                                    className="w-full px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="123"
                                    type="password"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 mt-6">
                        <p className="text-gray-600 text-sm font-semibold">Other Options</p>
                        <label className="flex items-center space-x-3 bg-gray-50 rounded-xl p-3 cursor-pointer hover:bg-gray-100 transition">
                            <input type="radio" name="payment" />
                            <span>Cash on Delivery</span>
                        </label>
                        <label className="flex items-center space-x-3 bg-gray-50 rounded-xl p-3 cursor-pointer hover:bg-gray-100 transition">
                            <input type="radio" name="payment" />
                            <span>UPI / Wallet</span>
                        </label>
                    </div>

                    <button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition cursor-pointer"
                        onClick={() => PostShippingDetails()}>
                        Place Order
                    </button>
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-80 h-100 bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Order Summary
                    </h2>

                    {/* Cart Items */}
                    <div className="space-y-4">

                        {userObject.map((val) => {
                            return <div className="flex items-center justify-between" key={val.id}>
                                <div>{val.brand} : ({val.cartQty})</div>
                                <div></div>
                                <div>{val.price * val.cartQty}</div>
                            </div>
                        })}

                    </div>

                    {/* Divider */}
                    <hr className="my-4" />

                    {/* Price Details */}
                    <div className="space-y-2 text-gray-700">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>$ {userObject.reduce((acc, val) => {
                                return acc + (val.price * val.cartQty)
                            }, 0)}</span>
                        </div>

                        <div className="flex justify-between ">
                            <span>Tax (10%)</span>
                            <span>{userObject.reduce((acc, val) => {
                                const itemTotal = val.price * val.cartQty;
                                return (acc + (itemTotal * 0.10))
                            }, 0).toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>${shipping}</span>
                        </div>
                        <div className="flex justify-between font-bold text-gray-900">
                            <span>Total</span>
                            <span>${grandTotal}</span>
                        </div>
                    </div>
                    <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition duration-300 cursor-pointer"
                        onClick={() => nav('/cart')}>
                        Go to Cart
                    </button>

                </div>
            </div>
        </div>
    )
}

export default ShippingPage