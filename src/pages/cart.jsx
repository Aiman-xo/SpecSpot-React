import React, { useEffect, useState } from 'react'
import Navbar from '../Reusables/navbar'
// import { useContext } from 'react'
// import { searchContext } from '../Context-API/context'
import '../mystyle.css'
import axios from 'axios'
import { data, useNavigate } from 'react-router-dom';

function Cart() {
    // let { addtocart, setAddtocart } = useContext(searchContext);
    let [userDetail, setuserDetails] = useState({ cart: [] });
    let nav = useNavigate()
    let [count, setCount] = useState(0);



    async function RemoveCartItem(removeInd, removedProduct) {
        let userId = localStorage.getItem("userId")
        alert(`removed item ${removedProduct}`)
        const filtered = userDetail.cart.filter((val) => {

            return val.id !== removeInd
        })
        setuserDetails({ cart: filtered })

        await axios.patch(`http://localhost:3000/users/${userId}`, {
            cart: filtered
        });



    }

    useEffect(() => {
        let userId = localStorage.getItem("userId")
        async function getCart() {
            const resp = await axios.get(`http://localhost:3000/users/${userId}`);
            const userDetails = await resp.data;
            setuserDetails(userDetails)
        }
        getCart()
    }, [])

    // async function QuantityInCart() {
    //     let userId = localStorage.getItem("userId")
    //     const resp = await axios.get(`http://localhost:3000/users/${userId}`);
    //     const data = await resp.data;

    //     // const QuantityCart = data.cart.map((cartItems) => {
    //     //     cartItems.id === productId ? { ...cartItems, cartQty: cartItems.cartQty + 1 } : cartItems
    //     // })

    //     await axios.patch(`http://localhost:3000/users/${userId}`, {

    //     });
    // }
    return (
        <div>
            <Navbar />
            <div className=''>
                <h2 className='text-center mt-4 font-bold text-xl font-[verdana] text-gray-600'>Cart products:</h2>
            </div>



            {

                userDetail.cart.length === 0 ?
                    <div className='flex justify-center items-center mt-4 font-bold text-2xl font-[arial] text-red-500 h-100'>
                        <p className=''>Cart Empty!</p>
                    </div>
                    :
                    userDetail.cart.map((val) => {


                        return <div className="flex justify-center" key={val.id}>
                            <div className="flex flex-col md:flex-row cartStyle mb-10 p-6 gap-12 w-full md:h-70 mt-10 max-w-3xl rounded-xl shadow-lg bg-white">

                                {/* Image Section */}
                                <div className="flex justify-center items-center w-full md:w-1/2">
                                    <img
                                        src={val.image}
                                        alt={val.model}
                                        className="w-50 rounded-xl shadow-md"
                                    />
                                </div>

                                {/* Text Section */}
                                <div className="flex justify-center items-center w-full md:w-1/2 text-center">
                                    <div>
                                        <h5 className="text-xl font-bold text-gray-800">{val.brand}</h5>
                                        <p className="text-gray-600 font-[verdana] text-sm">Model: {val.model}</p>
                                        <p className="text-gray-600 font-[verdana] text-sm"> Type: {val.type}</p>
                                        <p className="text-gray-600 font-[verdana] text-sm"> Frame: {val.frame}</p>
                                        <p className="text-green-600 text-lg font-semibold"> $ {val.price}</p>
                                        <div className='flex justify-center mt-4'>
                                            <button className="bg-gray-200 text-gray-700 text-xs font-bold px-3 rounded hover:bg-gray-300 hover:text-white cursor-pointer me-2" >
                                                -
                                            </button>

                                            <p>{val.cartQty}</p>
                                            <button className="bg-gray-200 text-gray-700 text-xs font-bold px-3 rounded hover:bg-gray-300 hover:text-white cursor-pointer ms-2" >
                                                +
                                            </button>
                                        </div>

                                        <div className="flex gap-4 justify-center mt-4">
                                            <button className="bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer">
                                                Buy Now
                                            </button>
                                            <button className="bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
                                                onClick={() => RemoveCartItem(val.id, val.brand)}>
                                                Remove from Cart
                                            </button>
                                        </div>

                                    </div>


                                </div>


                            </div>

                        </div>


                    })
            }


        </div>
    )
}

export default Cart