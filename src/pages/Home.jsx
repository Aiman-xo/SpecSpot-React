import React, { useEffect, useState } from 'react'

import Navbar from '../Reusables/navbar'
import { Link } from 'react-router-dom'
import Featured from '../featured/Featured'


function Home() {

    return (
        <div>
            <Navbar />

            <Link to={'/products'}><img src="https://static5.lenskart.com/media/uploads/Desktop-v2-topbanner-celebs-style-260625.png"
                alt="" className='cursor-pointer' /></Link>
            <Featured />


        </div>
    )









}

export default Home