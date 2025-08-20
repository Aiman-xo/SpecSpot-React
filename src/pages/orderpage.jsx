import React from 'react'
// import { useState } from 'react';
import Navbar from '../Reusables/navbar';
function ShippingPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <Navbar />

            <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto p-8">
                {/* Shipping Address */}
                <div className="flex-1 bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Shipping Address
                    </h2>
                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Address Line 1
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="Street address"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Address Line 2 (Optional)
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="Apartment, suite, etc."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    City
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="City"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    State/Province
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="State"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    ZIP/Postal Code
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="12345"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Country
                                </label>
                                <select className="w-full px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none">
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>United Kingdom</option>
                                    <option>Australia</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Payment Section */}
                <div className="flex-1 bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Payment Method
                    </h2>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Card Number
                            </label>
                            <input
                                className="w-full px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="1234 5678 9012 3456"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Expiry Date
                                </label>
                                <input
                                    className="w-full px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="MM/YY"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    CVV
                                </label>
                                <input
                                    className="w-full px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="123"
                                    type="password"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 mt-6">
                        <p className="text-gray-600 text-sm font-semibold">Other Options</p>
                        <label className="flex items-center space-x-3 bg-gray-50 rounded-xl p-3 cursor-pointer hover:bg-gray-100 transition">
                            <input type="radio" name="payment" />
                            <span>Cash on Delivery</span>
                        </label>
                        <label className="flex items-center space-x-3 bg-gray-50 rounded-xl p-3 cursor-pointer hover:bg-gray-100 transition">
                            <input type="radio" name="payment" />
                            <span>UPI / Wallet</span>
                        </label>
                    </div>

                    <button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition">
                        Place Order
                    </button>
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-80 h-90 bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Order Summary
                    </h2>

                    {/* Cart Items */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-800">Product 1</p>
                                <p className="text-sm text-gray-500">Qty: 2</p>
                            </div>
                            <p className="font-semibold text-gray-800">$40.00</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-800">Product 2</p>
                                <p className="text-sm text-gray-500">Qty: 1</p>
                            </div>
                            <p className="font-semibold text-gray-800">$25.00</p>
                        </div>
                    </div>

                    {/* Divider */}
                    <hr className="my-4" />

                    {/* Price Details */}
                    <div className="space-y-2 text-gray-700">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>$65.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>$5.00</span>
                        </div>
                        <div className="flex justify-between font-bold text-gray-900">
                            <span>Total</span>
                            <span>$70.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShippingPage