import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Reusables/navbar';
import { toast } from 'react-toastify';

function Profile() {
    let [userProfile, setUserProfile] = useState([]);
    let nav = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        async function userProfile() {
            const resp = await axios.get(`http://localhost:3000/users/${userId}`);
            const data = await resp.data;

            setUserProfile(data);
        }
        userProfile();
    }, [])

    function LogOut() {
        localStorage.removeItem("userId");
        // alert('loggin out....')
        toast.warning('logging out...')
        nav('/login')
    }
    // console.log(userProfile?.orders?.products)



    return (
        <>
            <Navbar />
            <div className="max-w-sm mx-auto mt-10 p-6 bg-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border border-gray-100">
                {/* User Icon / Avatar */}
                <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-gray-400 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10"
                            viewBox="0 0 24 24"
                            fill="white"
                        >
                            <path d="M12 12c2.761 0 5-2.462 5-5.5S14.761 1 12 1 7 3.462 7 6.5 9.239 12 12 12zm0 2c-4.418 0-8 2.239-8 
           5v2h16v-2c0-2.761-3.582-5-8-5z"/>
                        </svg>



                    </div>
                </div>

                {/* User Info */}
                <div className="text-center space-y-2">
                    <h2 className="text-xl font-semibold text-gray-800">{userProfile.name}</h2>
                    <p className="text-gray-600 text-sm">{userProfile.email}</p>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">{userProfile.role}</p>
                </div>

                {/* Divider */}
                <div className="my-4 border-t border-gray-200"></div>

                {/* Actions */}
                <div className="flex justify-center gap-3">
                    {/* <button className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:scale-105 transition-transform duration-200">
                        Edit
                    </button> */}
                    <button
                        className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 hover:scale-105 transition-transform duration-200"
                        onClick={LogOut}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/*this is the confirmed order section*/}
            {
                userProfile?.orders?.map((val, ind) => {
                    return <div className="min-h-60  p-6" key={ind}>
                        <div className="max-w-5xl mx-auto space-y-6">

                            {/* Order Card */}
                            <div className="bg-white rounded-2xl shadow-md p-6">
                                {/* Order Header */}
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4 mb-4">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">{val.id}</h2>
                                        <p className="text-gray-500">Placed on: Aug 20, 2025</p>
                                    </div>
                                    <span className="mt-2 md:mt-0 px-4 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700">
                                        Confirmed
                                    </span>
                                </div>

                                {/* Flex Layout: Shipping + Items */}
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Shipping Info */}
                                    <div className="flex-1 bg-gray-50 rounded-xl p-4">
                                        <h3 className="font-semibold text-gray-700 mb-3">Shipping Address</h3>
                                        <p className="text-gray-800 font-medium">{val.shipping.fullname}</p>
                                        <p className="text-gray-600">{val.shipping.mainAddress}</p>
                                        <p className="text-gray-600">{val.shipping.phone}</p>
                                        <p className="text-gray-600">{val.shipping.city}</p>
                                        <p className="text-gray-600">{val.shipping.pin}</p>
                                    </div>

                                    {/* Ordered Items */}
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-700 mb-3">Items</h3>
                                        <div className="space-y-4">
                                            {/* Item 1 */}
                                            {val?.products?.map((val) => {
                                                return <div className="flex items-center gap-4  pb-4">
                                                    <img
                                                        src={val.image}
                                                        alt="product"
                                                        className="w-30 h-20 object-cover rounded-lg"
                                                    />
                                                    <div className="flex-1">
                                                        <p className="font-medium text-gray-800">{val.brand}</p>
                                                        <p className="text-gray-600 text-sm">{val.cartQty}</p>
                                                    </div>
                                                    <p className="font-semibold text-gray-900">{val.price}</p>
                                                </div>
                                            })}


                                        </div>
                                    </div>
                                </div>

                                {/* Order Footer */}
                                <div className="border-t mt-6 pt-4 flex justify-between font-bold text-gray-900 text-lg">
                                    <span>Total</span>
                                    <span>${val?.products?.reduce((acc, val) => {
                                        const itemsTotal = val.price * val.cartQty
                                        return (acc + itemsTotal + (itemsTotal * 0.10)) + 10
                                    }, 0).toFixed(2)}</span>
                                </div>
                            </div>

                        </div>
                    </div>

                })
            }

        </>

    )
}

export default Profile