import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Reusables/navbar';

function Profile() {
    let [userProfile, setUserProfile] = useState([]);
    let nav = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        async function userProfile() {
            const resp = await axios.get(`http://localhost:3000/users/${userId}`);
            const data = await resp.data;

            setUserProfile(data);
        }
        userProfile();
    }, [])

    function LogOut() {
        localStorage.removeItem("userId");
        alert('loggin out....')
        nav('/login')
    }

    return (
        <>
            <Navbar />
            <div className="max-w-sm mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
                {/* User Icon */}
                <div className="flex justify-center mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-16 h-16 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v1h20v-1c0-3.3-6.7-5-10-5z" />
                    </svg>
                </div>

                {/* User Info */}
                <div className="text-center space-y-2">
                    <h2 className="text-lg font-semibold">{userProfile.name}</h2>
                    <p className="text-gray-600">{userProfile.email}</p>
                    <p className="text-gray-500 text-sm">{userProfile.role}</p>
                </div>

                {/* Actions */}
                <div className="mt-4 flex justify-center gap-3">
                    {/* <a
                    href="/profile/edit"
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Edit
                </a> */}
                    <button className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer" onClick={LogOut}>
                        Logout
                    </button>
                </div>
            </div>

        </>

    )
}

export default Profile