import React from 'react'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { searchContext } from '../Context-API/context';



function Navbar() {
    let [isMenuOpen, setIsMenuOpen] = useState(false);
    let { search, setSearch } = useContext(searchContext);

    return (


        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">

                {/* Brand Logo/Name */}
                <div className="flex items-center">
                    <Link href="#" className="text-2xl font-bold text-blue-600">
                        <i>
                            <h1 className="text-xl sm:text-3xl font-bold text-gray-400">
                                <span className="font-[verdana]">S</span>pec
                                <span className="text-yellow-400 font-[verdana]">S</span>pot
                            </h1>
                        </i>
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-md mx-4">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search for glasses, brands..."
                            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onChange={(e) => setSearch(e.target.value)} />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 hidden md:flex"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className='flex items-center space-x-7'>
                    <Link to={'/'} className="text-gray-700 hover:text-blue-600 hidden sm:inline-block">
                        Home
                    </Link>
                    <Link to={'/products'} className="text-gray-700 hover:text-blue-600 hidden sm:inline-block">
                        Product
                    </Link>
                </div>



                {/* Navigation Icons */}
                <div className="flex items-center space-x-6">
                    {/* Wishlist */}
                    <Link href="#" className="text-gray-700 hover:text-blue-600 relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            0
                        </span>
                    </Link>

                    {/* Cart */}
                    <Link href="#" className="text-gray-700 hover:text-blue-600 relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                        </svg>
                        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            0
                        </span>
                    </Link>

                    {/* Logout (Desktop Only) */}
                    <Link href="#" className="text-gray-700 hover:text-blue-600 hidden sm:inline-block">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                    </Link>

                    {/* Hamburger Menu (Mobile Only) */}
                    <button
                        className="sm:hidden text-gray-700 hover:text-blue-600"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="sm:hidden bg-white shadow-md mt-2 rounded-lg p-4">
                    <Link to={'/'} className="block py-2 text-gray-700 hover:text-blue-600">
                        Home
                    </Link>
                    <Link to={'/products'} className="block py-2 text-gray-700 hover:text-blue-600">
                        Product
                    </Link>
                    {/* Logout in Mobile Menu */}
                    <Link href="#" className="block py-2 text-red-700 hover:text-blue-600">
                        Logout
                    </Link>
                </div>
            )}
        </nav>

    )
}

export default Navbar