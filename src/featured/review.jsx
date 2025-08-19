import React from 'react'
import '../mystyle.css'

function Review() {
    return (
        <div className='flex justify-center mt-10 '>
            <div className='flex justify-center mt-10'>
                <div className='review-card me-3 p-4 rounded-xl shadow-md bg-white w-72'>

                    {/* User Info */}
                    <div className="flex items-center mb-3">
                        {/* Circle avatar with first letter */}
                        <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">
                            L
                        </div>
                        <div className="ms-3">
                            <p className="font-semibold text-sm">Lionel Messi</p>
                            <p className="text-xs text-gray-500">Verified Buyer</p>
                        </div>
                    </div>

                    {/* Review Text */}
                    <p className='text-xs text-gray-700 mt-2'>"These glasses are lightweight and super comfortable to wear all day. The lenses are crystal clear
                        and reduce eye strain, even after hours of screen time. Stylish design gets
                        me compliments everywhere I go!"</p>

                    {/* Stars */}
                    <div className='flex justify-center mt-4'>
                        <div className="flex text-amber-400 text-sm">
                            ★★★★☆
                        </div>
                    </div>
                </div>
            </div>


            <div className='flex justify-center mt-10'>
                <div className='review-card me-3 p-4 rounded-xl shadow-md bg-white w-72'>

                    {/* User Info */}
                    <div className="flex items-center mb-3">
                        {/* Circle avatar with first letter */}
                        <div className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold">
                            A
                        </div>
                        <div className="ms-3">
                            <p className="font-semibold text-sm">Ashraf</p>
                            <p className="text-xs text-gray-500">Verified Buyer</p>
                        </div>
                    </div>

                    {/* Review Text */}
                    <p className='text-xs text-gray-700 mt-2'>"I absolutely loved using this app!
                        The interface is super clean and easy to navigate. The notifications are quick, and I really appreciate how smooth everything feels.
                        Definitely recommend it to anyone looking for a hassle-free experience!"</p>

                    {/* Stars */}
                    <div className='flex justify-center mt-4'>
                        <div className="flex text-amber-400 text-sm">★★★★★</div>
                    </div>
                </div>
            </div>



            <div className='flex justify-center mt-10'>
                <div className='review-card me-3 p-4 rounded-xl shadow-md bg-white w-72'>

                    {/* User Info */}
                    <div className="flex items-center mb-3">
                        {/* Circle avatar with first letter */}
                        <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">
                            C
                        </div>
                        <div className="ms-3">
                            <p className="font-semibold text-sm">Cristiano Ronaldo</p>
                            <p className="text-xs text-gray-500">Verified Buyer</p>
                        </div>
                    </div>

                    {/* Review Text */}
                    <p className='text-xs text-gray-700 mt-2'>"Fantastic service! Everything worked exactly as promised and even exceeded my expectations.
                        The little details really make a big difference. I’ll definitely be coming back and recommending this to friends."</p>

                    {/* Stars */}
                    <div className='flex justify-center mt-4'>
                        <div className="flex text-amber-400 text-sm">★★★★★</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Review