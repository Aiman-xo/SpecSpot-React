import React, { useEffect, useState } from 'react'
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import '../mystyle.css'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";

function Featured() {
    let [data, setData] = useState([]);
    let navigate = useNavigate();
    let [wishlist1, setWishlist] = useState([]);
    // let {id}=useParams()

    // let [liked, setLiked] = useState({});

    useEffect(() => {
        async function products() {
            const resp = await axios.get('http://localhost:3000/products');
            const data1 = await resp.data;
            setData(data1);
        }
        products()
    }, [])


    //add to cart function


    async function AddtoCart(val, ID) {

        let userId = localStorage.getItem("userId");
        if (!userId) {
            // alert('please log in first!')
            toast.warning('please login first..')
            navigate('/login')
            return
        }
        const UserData = await axios.get(`http://localhost:3000/users/${userId}`);
        const data = await UserData.data;

        if (data.cart.find(item => item.id === ID)) {
            // alert(`${val.brand} already in the cart`)
            toast.error(`${val.brand} is already in the cart`)
        }
        else {
            let userId = localStorage.getItem("userId");
            console.log('user', userId)
            if (userId) {

                await axios.patch(`http://localhost:3000/users/${userId}`, {
                    cart: [...data.cart, val]

                })

            }
            // else {

            //     alert('please log in first!')
            //     navigate('/login')
            //     return

            // }
            // alert(`${val.brand} added to cart`)
            toast.success(`${val.brand} added to the cart`)

        }





    }







    async function wishlist(val, ID) {
        // const isLiked = liked[val.id] || false;
        // setLiked(pre => {
        //     return {
        //         ...pre,
        //         [val.id]: !pre[val.id]
        //     }
        // })


        const isLiked = wishlist1.some(item => item.id === ID);


        if (!isLiked) {

            const userId = localStorage.getItem("userId")
            if (!userId) {
                // alert('please log in first!')
                toast.warning('please login first..')
                navigate('/login')
                return
            }

            const resp = await axios.get(`http://localhost:3000/users/${userId}`);
            const data = await resp.data;

            if (data.wishlist.find((item) => item.id === ID)) {
                // alert(`${val.brand} already in wishlist`)
                toast.error(`${val.brand} is already in the wishlist`)
            }
            else {
                const updatedWishlist = [...data.wishlist, val]
                await axios.patch(`http://localhost:3000/users/${userId}`, {
                    wishlist: updatedWishlist
                });
                // alert(`${val.brand} is one of your liking`)
                setWishlist(updatedWishlist);

            }



        }
        else {
            const userID = localStorage.getItem("userId");

            const resp = await axios.get(`http://localhost:3000/users/${userID}`);
            const data = await resp.data;

            const newFiltered = data.wishlist.filter((val) => {
                return val.id !== ID
            })

            await axios.patch(`http://localhost:3000/users/${userID}`, {
                wishlist: newFiltered
            })
            setWishlist(newFiltered)

            // alert(`${val.brand} removed from wishlist`)
        }


    }
    return (
        <div className='grid grid-cols-2 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mt-4 '>




            {
                data.slice(0, 4).map((val) => {
                    const isLiked = wishlist1.some(item => item.id === val.id);
                    return <div className='card ' key={val.id}>
                        <div className='flex justify-center'>
                            <Link to={`/induvidual/${val.id}`}><img src={val.image} alt="" className='w-40 mt-3' /></Link>
                        </div>
                        <div className='flex justify-start ms-5'>
                            <div >
                                <p className='font-bold text-xl mb-3 mt-1'>{val.brand}</p>
                                <p className='mb-1'>{val.model}</p>
                                <p className='text-green-500 '>{val.price}</p>
                                <button className='bg-yellow-500 px-3 py-1 rounded text-xs cursor-pointer hover:bg-yellow-400' onClick={() => AddtoCart(val, val.id)}>Add to cart</button>
                                <button
                                    onClick={() => wishlist(val, val.id)}
                                    className="p-2 rounded-full hover:bg-gray-100 transition ms-13 cursor-pointer"
                                >
                                    {isLiked ? (
                                        <HeartSolid className="h-6 w-6 text-red-500" />
                                    ) : (
                                        <HeartOutline className="h-6 w-6 text-gray-500" />
                                    )}
                                </button>

                            </div>
                        </div>

                    </div>
                })
            }

        </div>
    )
}

export default Featured