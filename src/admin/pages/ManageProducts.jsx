import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Pencil, Trash, Check, X, Plus } from 'lucide-react';
import FormModal from '../Modals/FormModal';


function ManageProducts() {
    let [products, setProducts] = useState([]);
    let [searchValue, setSearchValue] = useState("");
    let [notfound, setNotfound] = useState('');
    let [flag, setFlag] = useState(false);
    let [form, setForm] = useState(false);
    useEffect(() => {
        async function GetProducts() {
            const resp = await axios.get("http://localhost:3000/products");
            const data = resp.data;
            setProducts(data);

            setNotfound('');
            if (searchValue.trim() !== '') {

                const filtered = data.filter((val) => {
                    return (val.brand.toLowerCase().includes(searchValue.toLowerCase()) ||
                        val.id == Number(searchValue)
                    )



                })
                setProducts(filtered);

                if (filtered.length === 0) {
                    setNotfound('No Products Availabe!')
                }
            }


        }
        GetProducts()
    }, [flag, searchValue]);


    async function StatusInactive(ProductId) {
        await axios.get(`http://localhost:3000/products/${ProductId}`);


        await axios.patch(`http://localhost:3000/products/${ProductId}`, {
            Productstatus: "Inactive"
        })
        setFlag(pre => !pre)

    }

    async function StatusActive(ProductId) {
        await axios.get(`http://localhost:3000/products/${ProductId}`);


        await axios.patch(`http://localhost:3000/products/${ProductId}`, {
            Productstatus: "Active"
        })
        setFlag(pre => !pre)

    }
    return (
        <div>
            {form && <FormModal prop={setForm} />}
            <div className="flex justify-center items-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search..."
                    className="p-2 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-100"
                    onChange={(e) => setSearchValue(e.target.value)} />

                <div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition cursor-pointer" onClick={() => setForm(true)}>
                        <Plus size={18} />
                        <span className="font-medium" >Add Products</span>
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto bg-white shadow-lg rounded">

                <table className="min-w-full border-collapse">
                    <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                        <tr>

                            <th className="px-6 py-3 text-left text-sm font-semibold">#ID</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Image</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Price ($)</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Stock</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                            <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>



                    <tbody className="divide-y divide-gray-200">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 transition">

                                <td className="px-6 py-4 text-sm font-medium text-gray-700">{product.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{product.brand}</td>
                                <td className="px-6 py-4 text-sm text-gray-700"><img src={product.image} alt="" className='w-30 h-20 object-fit ' /></td>
                                <td className="px-6 py-4 text-sm text-gray-500">{product.type}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">${product.price}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{product.quantity}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${product.Productstatus === "Active"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {product.Productstatus}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex gap-2">

                                        <button className="flex-1 flex items-center justify-center gap-1 px-3 md:py-1 md:px-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition text-sm cursor-pointer">
                                            <Pencil size={16} />

                                        </button>

                                        <button className="flex-1 flex items-center justify-center gap-1  px-3 py-2 md:px-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm cursor-pointer">
                                            <Trash size={16} />

                                        </button>



                                        {product.Productstatus === "Active" ? (
                                            <button className="flex items-center gap-2 px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-red-600 transition text-sm cursor-pointer " onClick={() => StatusInactive(product.id)}>
                                                <X size={16} />

                                            </button>) : (

                                            <button className="flex items-center gap-2 px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm cursor-pointer" onClick={() => StatusActive(product.id)}>
                                                <Check size={16} />

                                            </button>)
                                        }

                                    </div>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>

            <div className='flex justify-center mt-10 text-red-500 text-xl'>
                <p>{notfound}</p>
            </div>

        </div>
    )
}

export default ManageProducts