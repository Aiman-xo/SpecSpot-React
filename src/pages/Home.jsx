import React, { useEffect, useState } from 'react'

import Navbar from '../Reusables/navbar'
import { Link } from 'react-router-dom'
import Featured from '../featured/Featured'
import Review from '../featured/review'
import Footer from '../featured/footer'


function Home() {

    return (
        <div>
            <Navbar />

            <Link to={'/products'}><img src="https://static5.lenskart.com/media/uploads/Desktop-v2-topbanner-celebs-style-260625.png"
                alt="" className='cursor-pointer hover:scale-101 transition-transform duration-500' /></Link>
            <div className='flex justify-center mt-4 font-bold text-xl font-[verdana] text-gray-600'>
                <i><h1>Featured Ones</h1></i>
            </div>

            <Featured />
            <div className='flex justify-center mt-10 font-bold text-xl font-[verdana] text-gray-600'>
                <i><h1>Reviews</h1></i>
            </div>
            <Review />

            <Link to={'/products'}><img src="https://static5.lenskart.com/media/uploads/Desktop-v2-topbanner-hustlr.png"
                alt="" className='cursor-pointer mt-10' /></Link>

            <Footer />


        </div>
    )









}

export default Home