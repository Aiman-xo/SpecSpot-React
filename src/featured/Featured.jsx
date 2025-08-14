import React, { useEffect, useState } from 'react'
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import '../mystyle.css'
import axios from 'axios'

function Featured() {
    let [data, setData] = useState([]);

    let [liked, setLiked] = useState({});

    useEffect(() => {
        async function products() {
            const resp = await axios.get('http://localhost:3000/products');
            const data1 = await resp.data;
            setData(data1);
        }
        products()
    }, [])
    return (
        <div className='grid grid-cols-2 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mt-4 '>




            {
                data.slice(0, 4).map((val) => {
                    const isLiked = liked[val.id] || false;
                    return <div className='card ' key={val.id}>
                        <div className='flex justify-center'>
                            <img src={val.image} alt="" className='w-40 mt-3' />
                        </div>
                        <div className='flex justify-start ms-5'>
                            <div >
                                <p className='font-bold text-xl mb-3 mt-1'>{val.brand}</p>
                                <p className='mb-1'>{val.model}</p>
                                <p className='text-green-500 '>{val.price}</p>
                                <button className='bg-yellow-500 px-3 py-1 rounded text-xs cursor-pointer hover:bg-yellow-400'>Add to cart</button>
                                <button
                                    onClick={() => setLiked(pre => {
                                        return {
                                            ...pre,
                                            [val.id]: !pre[val.id]
                                        }
                                    })}
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