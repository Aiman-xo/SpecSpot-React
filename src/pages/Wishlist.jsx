import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../Reusables/navbar';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Wishlist() {



    const userId = localStorage.getItem("userId")

    let [wishlistItem, setWishlistItem] = useState([]);

    useEffect(() => {
        async function wish() {
            const resp = await axios.get(`http://localhost:3000/users/${userId}`);
            const data = await resp.data;
            setWishlistItem(data.wishlist);
        }
        wish()
    }, [])
    async function RemoveWishlist(WishId, Brand) {
        const resp = await axios.get(`http://localhost:3000/users/${userId}`);
        const data = await resp.data;
        // setWishlistItem(data.wishlist)

        const filtered = data.wishlist.filter((val) => {
            return val.id !== WishId;
        })
        await axios.patch(`http://localhost:3000/users/${userId}`, {
            wishlist: filtered
        })
        setWishlistItem(filtered)
        toast.error(`${Brand} removed from wishlist`)
    }

    async function AddtoCart(Product, ID, brand) {
        const userId = localStorage.getItem("userId");
        // if (!userId) {
        //     toast.warning('please login')
        //     nav('/login')
        // }
        const resp = await axios.get(`http://localhost:3000/users/${userId}`);
        const data = await resp.data;

        if (data.cart.find((item) => item.id === ID)) {
            toast.error(`${brand} already in the cart`)
        } else {
            await axios.patch(`http://localhost:3000/users/${userId}`, {
                cart: [...data.cart, Product]
            })
            toast.success(`${brand} is added to you cart`)
        }


    }
    return (
        <div>
            <Navbar />
            <div className=''>
                <h2 className='text-center mt-4 font-bold text-xl font-[verdana] text-gray-600'>Wishlist:</h2>
            </div>



            {

                wishlistItem.length === 0 ?
                    <div className='flex justify-center items-center mt-4 font-bold text-xl font-[arial] text-red-500 h-100'>
                        <p className=''>Nothing in wishlist!</p>
                    </div>
                    :
                    wishlistItem.map((val) => {


                        return <div className="flex justify-center" key={val.id}>
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
                                        <h5 className="text-xl font-bold text-gray-800">{val.brand}</h5>
                                        <p className="text-gray-600 font-[verdana] text-sm">Model: {val.model}</p>
                                        <p className="text-gray-600 font-[verdana] text-sm"> Type: {val.type}</p>
                                        <p className="text-gray-600 font-[verdana] text-sm"> Frame: {val.frame}</p>
                                        <p className="text-green-600 text-lg font-semibold"> $ {val.price}</p>

                                        <div className="flex gap-4 justify-center mt-4">
                                            <button className="bg-yellow-500 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-yellow-600 cursor-pointer" onClick={() => AddtoCart(val, val.id, val.brand)}>
                                                Add to Cart
                                            </button>
                                            <button className="bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
                                                onClick={() => RemoveWishlist(val.id, val.brand)}>
                                                Remove from Wishlist
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

export default Wishlist