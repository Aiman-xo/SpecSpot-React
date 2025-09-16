import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { Pencil, Trash, Check, X, Plus, Package } from 'lucide-react';
import FormModal from '../Modals/FormModal';
import { adminContext } from '../../Context-API/adminContext';
import EditFormModal from '../Modals/EditFormModal';
import { toast } from 'react-toastify';
import Api from '../api/api';


function ManageProducts() {
    // let [products, setProducts] = useState([]);
    const { setProducts, products } = useContext(adminContext);
    let [searchValue, setSearchValue] = useState("");
    let [notfound, setNotfound] = useState('');
    let [flag, setFlag] = useState(false);
    let [form, setForm] = useState(false);
    let [selectEdit, setSelectEdit] = useState(null);
    let [editform, setEditForm] = useState(false);
    let [showDeleteModal, setshowDeleteModal] = useState(false);
    let [deleteId, setDeleteId] = useState();
    let [numTotalProducts, setNumTotalProducts] = useState(0);
    let { products1, users } = Api();
    useEffect(() => {
        async function GetProducts() {
            const resp = await axios.get(products1);
            const data = resp.data;
            setProducts(data);
            setNumTotalProducts(data.length);

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
        await axios.get(`${products1}/${ProductId}`);


        await axios.patch(`${products1}/${ProductId}`, {
            Productstatus: "out-of-stock"
        })
        setFlag(pre => !pre)

    }

    async function StatusActive(ProductId) {
        await axios.get(`${products1}/${ProductId}`);


        await axios.patch(`${products1}/${ProductId}`, {
            Productstatus: "available"
        })
        setFlag(pre => !pre)

    }

    async function DeleteProduct(ProductId) {
        setshowDeleteModal(false)
        await axios.get(`${products1}/${ProductId}`);


        await axios.delete(`${products1}/${ProductId}`)
        setFlag(pre => !pre)
        toast.error('Product Deleted');

    }


    function FormEditing(productObject) {
        setSelectEdit(productObject);
        setEditForm(true);

    }

    function DeleteConfirmation(deleteId) {
        setshowDeleteModal(true);
        setDeleteId(deleteId);

    }
    // console.log(selectEdit);
    return (
        <div className='bg-gray-100 p-15 rounded-xl'>
            {form && <FormModal onClose={setForm} />}
            {editform && <EditFormModal onClose={setEditForm} EditProduct={selectEdit} />}

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Products List</h1>
                <p className="text-gray-500 mt-1">Welcome back! What's the New Change.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-20">
                <div className="flex items-center justify-between">
                    <div className="p-3 bg-purple-500 rounded-full">
                        <Package className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Total Products</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-2">{numTotalProducts}</h3>
                    </div>

                </div>
            </div>
            <div className="flex justify-center items-center gap-4 mb-6 bg-gray-100 p-10">
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
                            <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
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
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${product.Productstatus === "available"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {product.Productstatus}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex gap-2">

                                        <button className="flex-1 flex items-center justify-center gap-1 px-3 md:py-1 md:px-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition text-sm cursor-pointer" onClick={() => FormEditing(product)}>
                                            <Pencil size={16} />

                                        </button>

                                        <button className="flex-1 flex items-center justify-center gap-1  px-3 py-2 md:px-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm cursor-pointer" onClick={() => DeleteConfirmation(product.id)}>
                                            <Trash size={16} />

                                        </button>



                                        {product.Productstatus === "available" ? (
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

            {showDeleteModal && (
                <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-80">
                        <h2 className="text-base  mb-4">
                            Are you sure you want to delete the product?
                        </h2>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => DeleteProduct(deleteId)}
                                className="bg-red-500 text-white px-4 py-1 rounded-lg cursor-pointer hover:bg-red-600"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setshowDeleteModal(false)}
                                className="bg-gray-300 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-400"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default ManageProducts