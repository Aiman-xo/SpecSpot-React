import React, { useEffect, useState } from 'react'
import '../mystyle.css'
import axios from 'axios'

function Featured() {
    let [data, setData] = useState([]);

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
                data.map((val) => {
                    return <div className='card '>
                        <div className='flex justify-center'>
                            <img src={val.image} alt="" className='w-40 mt-3' />
                        </div>

                        <p>{val.model}</p>
                    </div>
                })
            }
            {/* <div className='card'>

            </div>

            <div className='card'>

            </div>

            <div className='card'>

            </div>



            <div className='card'>

            </div>

            <div className='card'>

            </div>

            <div className='card'>

            </div>

            <div className='card'>

            </div> */}
        </div>
    )
}

export default Featured