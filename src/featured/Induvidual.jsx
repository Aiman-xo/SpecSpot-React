import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../Reusables/navbar';
import { toast } from "react-toastify";

function Induvidual() {
    let { id } = useParams();
    let [induvidual, setInduvidual] = useState([]);
    let nav = useNavigate();


    useEffect(() => {
        async function GetInduvidualProduct() {
            const resp = await axios.get(`http://localhost:3000/products/${id}`);
            const data = await resp.data;

            setInduvidual(data);
        }
        GetInduvidualProduct();
    }, [id])

    async function AddtoCart(Product, ID, brand) {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            toast.warning('please login')
            nav('/login')
        }
        const resp = await axios.get(`http://localhost:3000/users/${userId}`);
        const data = await resp.data;

        if (data.cart.find((item) => item.id === ID)) {
            toast.error(`${brand} already in the cart`)
        } else {
            await axios.patch(`http://localhost:3000/users/${userId}`, {
                cart: [...data.cart, Product]
            })
            toast.success(`${Product.brand} is added to you cart`)
        }


    }









    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto p-6 ">
                {/* Product Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Image Section */}
                    <div className="flex justify-center items-center bg-gray-50 rounded-lg p-6 shadow-md">
                        <img
                            src={induvidual.image}
                            alt="Product"
                            className="rounded-lg max-h-[400px] object-cover"
                        />
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-3">{induvidual.brand}</h1>
                            <p className="text-gray-500 mb-2">{induvidual.model}</p>
                            <p className="text-2xl font-semibold text-green-600 mb-4">${induvidual.price}</p>

                            <p className="text-gray-700 leading-relaxed mb-6">
                                This is a short description of the product. Highlight the main
                                features, quality, and why it’s worth buying. Make it simple yet
                                attractive for the user.
                            </p>

                            {/* Buttons */}
                            <div className="flex gap-4">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md cursor-pointer" onClick={() => AddtoCart(induvidual, induvidual.id, induvidual.brand)}>
                                    Add to Cart
                                </button>
                                <button className="bg-green-600 text-white  px-6 py-2 rounded-lg hover:bg-green-700 cursor-pointer" onClick={() => nav('/orders')}>
                                    Buy Now
                                </button>
                            </div>
                        </div>

                        {/* Extra Info */}
                        <div className="mt-6 border-t pt-4">
                            <h2 className="text-lg font-semibold mb-2">Product Details</h2>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                                <li> Frame: {induvidual.frame_material}</li>
                                <li>1-year warranty</li>
                                <li>Available in multiple colors</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Induvidual