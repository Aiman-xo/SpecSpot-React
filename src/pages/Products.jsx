import React, { useContext, useEffect } from 'react'
import Navbar from '../Reusables/navbar'
import axios from 'axios'
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useState } from 'react'
import { data, Link } from 'react-router-dom';
import '../mystyle.css'
// import { data } from 'react-router-dom';
import { searchContext } from '../Context-API/context';

function Products() {

    let [products, setProducts] = useState([]);
    let [details, setDetails] = useState(products);
    let [liked, setLiked] = useState({});
    let [notfound, setNotfound] = useState('');
    // let [filter, setFilter] = useState('')
    const { search } = useContext(searchContext);
    const { user } = useContext(searchContext);
    // const { addtocart, setAddtocart } = useContext(searchContext);


    useEffect(() => {

        if (search.trim() === '') {
            setDetails(products);
            setNotfound('');
        }
        else {
            setNotfound('');
            const searchArr = products.filter((val) => {
                return val.brand.toLowerCase().includes(search.toLowerCase())
            })
            setDetails(searchArr)

            if (searchArr.length === 0) {

                setNotfound('No Products Found!')
            }
        }


    }, [search])

    useEffect(() => {
        async function ProductList() {
            const resp = await axios.get('http://localhost:3000/products');
            const data = await resp.data;
            setProducts(data);
            setDetails(data)
        }
        ProductList();
    }, [])

    function Filter(filterValue) {
        if (filterValue === null) {
            setDetails(products);
        }
        else {
            const filteredOne = products.filter((val) => {
                return val.type === filterValue
            })
            setDetails(filteredOne);
            // console.log(filteredOne);
        }

    }

    function AmountFilter(productType) {
        const amountFilter = products.filter((val) => {
            if (productType === 'budget') {
                return val.price < 200
            }
            else {
                return val.price > 200
            }

        })
        setDetails(amountFilter)
    }

    // function AddtoCart(Vid, Vbrand, Vmodel, Vprice, Vimage, Vtype, Vframe, Vqty) {
    //     if (addtocart.filter((val) => {
    //         return val.id === Vid
    //     }).length > 0) {
    //         alert(`${Vbrand} already exists in the cart!`)
    //     }
    //     else {
    //         setAddtocart((pre) => [...pre, { id: Vid, brand: Vbrand, model: Vmodel, price: Vprice, image: Vimage, type: Vtype, frame: Vframe, qty: Vqty }]);
    //         alert('item added to cart')
    //     }
    // }


    async function AddtoCart(val, ID) {

        let userId = localStorage.getItem("userId");
        const UserData = await axios.get(`http://localhost:3000/users/${userId}`);
        const data = await UserData.data;

        if (data.cart.find(item => item.id === ID)) {
            alert(`${val.brand} already in the cart`)
        }
        else {
            let userId = localStorage.getItem("userId");
            console.log('user', userId)
            if (userId) {

                await axios.patch(`http://localhost:3000/users/${userId}`, {
                    cart: [...data.cart, val]

                })

            }
            alert(`${val.brand} added to cart`)

        }





    }
    return (
        <div >
            <Navbar />

            <Link ><img src="https://static5.lenskart.com/media/uploads/Desktop-v2-topbanner-mavericks.png"
                alt="" className='cursor-pointer hover:scale-101 transition-transform duration-500' /></Link>

            <div className=''>
                <h2 className='text-center mt-4 font-bold text-xl font-[verdana] text-gray-600'>Our Products</h2>
            </div>

            <div className='flex justify-start'>
                <h4 className='ms-6 mt-6  text-base font-[verdana] text-gray-900'>Filter your search:</h4>
            </div>

            <div className='flex flex-wrap justify-center gap-3 mt-5'>
                <button className='bg-gray-200 me-4 p-5 rounded-xl text-sm font-[verdana] cursor-pointer hover:bg-gray-300 hover:text-gray-700' onClick={() => {

                    Filter('sunglass');
                }}>Sunglasses</button>
                <button className='bg-gray-200 me-4 p-5 rounded-xl text-sm font-[verdana] cursor-pointer hover:bg-gray-300 hover:text-gray-700' onClick={() => {
                    Filter('transparent');
                }}>Transparent</button>
                <button className='bg-gray-200 me-4 p-5 rounded-xl text-sm font-[verdana] cursor-pointer hover:bg-gray-300 hover:text-gray-700' onClick={() => AmountFilter('budget')}>Under 200</button>
                <button className='bg-gray-200 me-4 p-5 rounded-xl text-sm font-[verdana] cursor-pointer hover:bg-gray-300 hover:text-gray-700' onClick={() => AmountFilter('expensive')}>Above 200 </button>
                <button className='bg-gray-200 me-4 p-5 rounded-xl text-sm font-[verdana] cursor-pointer hover:bg-gray-300 hover:text-gray-700' onClick={() => Filter('normal')}>Normal</button>
                <button className='bg-gray-200 me-4 p-5 rounded-xl text-sm font-[verdana] cursor-pointer hover:bg-gray-300 hover:text-gray-700' onClick={() => {
                    Filter(null)
                }}>Show all</button>
            </div>

            <div className='flex justify-start'>
                <h4 className='ms-6 mt-6  text-base font-[verdana] text-gray-900'>Find the product you love:</h4>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl mx-auto mt-4 '>

                {
                    details.map((val) => {
                        const isLiked = liked[val.id] || false;

                        return <div key={val.id}>
                            <div className='card  ' >
                                <div className='flex justify-center'>
                                    <img src={val.image} alt="" className='w-40 mt-3' />
                                </div>
                                <div className='flex justify-start ms-5'>
                                    <div >
                                        <p className='font-bold text-xl mb-3 mt-1'>{val.brand}</p>
                                        <p className='mb-1'>{val.model}</p>
                                        <p className='text-green-500 '>{`$ ${val.price}`}</p>
                                        <button className='bg-yellow-500 px-3 py-1 rounded text-xs cursor-pointer hover:bg-yellow-400'
                                            onClick={() => AddtoCart(val, val.id)}>Add to cart</button>
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
                        </div>

                    })
                }

            </div>


            <div className='w-auto h-60 flex  items-center justify-center text-[17px] font-[verdana] text-red-400'>
                <div>
                    <h1>{notfound}</h1>
                </div>

            </div>

        </div>
    )
}

export default Products