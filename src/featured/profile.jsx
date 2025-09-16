import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Reusables/navbar';
import { toast } from 'react-toastify';

function Profile() {
    let [userProfile, setUserProfile] = useState([]);
    // let [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    let [orderId, setOrderId] = useState();
    let nav = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        async function userProfile() {
            const resp = await axios.get(`https://specspot-db.onrender.com/users/${userId}`);
            const data = await resp.data;

            setUserProfile(data);
        }
        userProfile();
    }, [])

    function LogOut() {
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        // alert('loggin out....')
        toast.warning('logging out...')
        nav('/login')
    }
    // console.log(userProfile?.orders?.products)

    async function CancelOrder(OrderID) {
        setShowModal(false)
        toast.error('order cancelled');
        const userId = localStorage.getItem("userId");
        const resp = await axios.get(`https://specspot-db.onrender.com/users/${userId}`);
        const data = resp.data;


        const cancelOrder = data.orders.filter((item) => {
            return item.id !== OrderID
        })

        await axios.patch(`https://specspot-db.onrender.com/users/${userId}`, {
            orders: cancelOrder
        })

        setUserProfile({ ...data, orders: cancelOrder });


    }
    function showConfirmation(orderId) {
        setOrderId(orderId);
        setShowModal(true)
    }



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

                    <button
                        className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 hover:scale-105 transition-transform duration-200 cursor-pointer"
                        onClick={LogOut}
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className='text-center mt-10 font-bold font-[verdana] text-gray-500 text-lg'>Your Orders:</div>

            {/*this is the confirmed order section*/}
            {userProfile?.orders?.length === 0 ? (
                <div className="text-center py-10 text-red-500 text-base">
                    No Orders Found!
                </div>
            ) : (
                userProfile?.orders?.map((val, ind) => {
                    return <div className="min-h-60  p-6" key={ind}>
                        <div className="max-w-5xl mx-auto space-y-6">

                            {/* Order Card */}
                            <div className="bg-white rounded-2xl shadow-md p-6">
                                {/* Order Header */}
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4 mb-4">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">#{val.id}</h2>
                                        <p className="text-gray-500">{val.date}</p>
                                    </div>
                                    <span className={`mt-2 inline-block px-3 py-2 rounded-full text-sm font-medium w-20 text-center ${val.orderStatus === "pending" ? "bg-yellow-100 text-yellow-700" : val.orderStatus === "shipped" ? "bg-blue-100 text-blue-700" :
                                        val.orderStatus === "delivered" ? "bg-green-100 text-green-700" : val.orderStatus === "cancelled" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`}>{val.orderStatus}</span>
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
                                        <p className="text-gray-600">{val.shipping.country}</p>
                                    </div>

                                    {/* Ordered Items */}
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-700 mb-3">Items</h3>
                                        <div className="space-y-4">
                                            {/* Item 1 */}
                                            {val?.products?.map((val) => {
                                                return <div className="flex items-center gap-4  pb-4" key={val.id}>
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
                                <div className="border-t mt-6 pt-4 flex justify-between ">
                                    <span className='font-bold text-gray-900 text-xs'>Total After Taxes and Shipping Charge:</span>
                                    <span className='font-bold text-gray-900 '>${val?.products?.reduce((acc, val) => {
                                        const itemsTotal = val.price * val.cartQty
                                        return (acc + itemsTotal + (itemsTotal * 0.10)) + 10
                                    }, 0).toFixed(2)}</span>
                                </div>

                                <div className='flex justify-center'>
                                    <button className='bg-red-500 px-5 py-1 rounded text-white hover:bg-red-600 cursor-pointer mt-10' onClick={() => showConfirmation(val.id)}>Cancel</button>
                                </div>
                            </div>


                        </div>
                    </div>

                })
            )
            }

            {showModal && (
                <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-80">
                        <h2 className="text-base  mb-4">
                            Are you sure you want to cancel the order?
                        </h2>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => CancelOrder(orderId)}
                                className="bg-red-500 text-white px-4 py-1 rounded-lg cursor-pointer hover:bg-red-600"
                            >
                                Yes, Cancel
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-400"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>

    )
}

export default Profile