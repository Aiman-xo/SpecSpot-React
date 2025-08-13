import React from 'react'
import '../mystyle.css'

function Review() {
    return (
        <div className='flex justify-center mt-10 '>
            <div className='review-card me-3'>
                <p className='text-xs text-center mt-3 ms-1 me-1'>"These glasses are lightweight and super comfortable to wear all day. The lenses are crystal clear
                    and reduce eye strain, even after hours of screen time. Stylish design gets
                    me compliments everywhere I go!"</p>
                <div className='flex justify-center mt-4'>
                    <img src="../src/assets/images/PikPng.com_five-stars-png_2381161.png" alt="" className='w-20' />
                </div>


            </div>

            <div className='review-card me-3'>
                <p className='text-xs text-center mt-3 ms-1 me-1'>"These glasses are lightweight and super comfortable to wear all day. The lenses are crystal clear
                    and reduce eye strain, even after hours of screen time. Stylish design gets
                    me compliments everywhere I go!"</p>
                <div className='flex justify-center mt-4'>
                    <img src="../src/assets/images/PikPng.com_five-stars-png_2381161.png" alt="" className='w-20' />
                </div>


            </div>

            <div className='review-card me-3'>
                <p className='text-xs text-center mt-3 ms-1 me-1'>"These glasses are lightweight and super comfortable to wear all day. The lenses are crystal clear
                    and reduce eye strain, even after hours of screen time. Stylish design gets
                    me compliments everywhere I go!"</p>
                <div className='flex justify-center mt-4'>
                    <img src="../src/assets/images/PikPng.com_five-stars-png_2381161.png" alt="" className='w-20' />
                </div>


            </div>
        </div>
    )
}

export default Review