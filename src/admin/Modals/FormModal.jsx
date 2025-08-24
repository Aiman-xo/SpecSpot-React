import React from 'react'
import {
    Package,
    Tags,
    Layers,
    DollarSign,
    Box,
    FileText,
    Image as ImageIcon,
    PlusCircle,
    X,
} from "lucide-react";
function FormModal({ prop }) {
    return (



        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl">
                {/* Header */}
                <div className="flex justify-between items-center border-b px-6 py-4">
                    <h2 className="text-xl font-bold text-gray-800">Add New Product</h2>
                    <button
                        onClick={() => prop(false)}
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Form */}
                <form className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6">
                    {/* Product Name */}
                    <div>
                        <label className="block mb-1 text-gray-700 font-medium">
                            Product Name
                        </label>
                        <div className="relative">
                            <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Enter product name"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Brand */}
                    <div>
                        <label className="block mb-1 text-gray-700 font-medium">
                            Brand
                        </label>
                        <div className="relative">
                            <Tags className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Enter brand name"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block mb-1 text-gray-700 font-medium">
                            Category
                        </label>
                        <div className="relative">
                            <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Enter category"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block mb-1 text-gray-700 font-medium">
                            Price ($)
                        </label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="number"
                                placeholder="Enter price"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Stock */}
                    <div>
                        <label className="block mb-1 text-gray-700 font-medium">
                            Stock Quantity
                        </label>
                        <div className="relative">
                            <Box className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="number"
                                placeholder="Enter stock quantity"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Description (full width) */}
                    <div className="md:col-span-2">
                        <label className="block mb-1 text-gray-700 font-medium">
                            Description
                        </label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                            <textarea
                                placeholder="Enter product description"
                                rows={3}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            ></textarea>
                        </div>
                    </div>

                    {/* Image URL */}
                    <div className="md:col-span-2">
                        <label className="block mb-1 text-gray-700 font-medium">
                            Image URL
                        </label>
                        <div className="relative">
                            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="url"
                                placeholder="Enter image link"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 flex justify-end">
                        <button
                            type="button"
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200"
                        >
                            <PlusCircle className="w-5 h-5" />
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default FormModal