import React, { useEffect, useState } from 'react'
import { Lock, Unlock } from "lucide-react";
import axios from 'axios';

function Users() {
    let [users, setUsers] = useState([]);
    let [flag, setFlag] = useState(false);
    let [searchValue, setSearchValue] = useState("");
    let [notfound, setNotfound] = useState('');
    let [sortStatus, setSortStatus] = useState('all');

    // useEffect(() => {
    //     async function GetUsers() {
    //         const resp = await axios.get('http://localhost:3000/users');
    //         const data = await resp.data;
    //         setUsers(data);


    //     }

    //     GetUsers()
    // }, [flag])

    useEffect(() => {
        async function GetUsers() {
            const resp = await axios.get('http://localhost:3000/users');
            const data = await resp.data;

            let filtered = data;

            if (searchValue.trim() !== '') {
                filtered = filtered.filter((val) => {
                    return val.name.toLowerCase().includes(searchValue.toLowerCase())
                })
            }

            //sort based on status

            if (sortStatus !== "all") {

                filtered = filtered.filter((val) => {
                    return val.status === sortStatus
                })
            }
            setUsers(filtered);
            if (filtered.length === 0) {
                setNotfound("No users Found!");
            } else {
                setNotfound("")
            }

        }
        GetUsers()
    }, [searchValue, flag, sortStatus])


    async function SetBlock(userId) {


        // const Activate = setstatus === "Active" ? "Inactive" : "Active"

        await axios.patch(`http://localhost:3000/users/${userId}`, {
            status: "Inactive"
        })
        setFlag(pre => !pre)
    }

    async function Unblock(userId) {

        // const Activate = setstatus === "Active" ? "Inactive" : "Active"

        await axios.patch(`http://localhost:3000/users/${userId}`, {
            status: "Active"
        })
        setFlag(pre => !pre)
    }

    return (
        <div className="p-2">
            <i><h1 className="text-xl sm:text-3xl font-bold text-gray-400 text-center">
                <span className="font-[verdana]">S</span>pec
                <span className="text-yellow-400 font-[verdana]">S</span>pot
            </h1></i>
            {/* Header */}
            <h1 className="text-2xl font-bold text-gray-800 mb-6">All Users</h1>

            <div className="flex justify-end items-center gap-4 mb-6">
                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search..."
                    className="p-2 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => setSearchValue(e.target.value)} />

                {/* Select Option */}
                <select className="p-2 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => setSortStatus(e.target.value)} value={sortStatus}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="all">All</option>
                </select>
            </div>


            {/* Table */}
            <div className="overflow-x-auto bg-white shadow-lg rounded">
                <table className="min-w-full border-collapse">
                    <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Sno</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">#id</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Total Orders</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Total Products Ordered</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                            <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {users.map((user, index) => user.role === "user" && (
                            <tr key={user.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-sm font-medium text-gray-700">{index}</td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-700">{user.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                                <td className="px-15 py-4 text-sm  text-gray-500">{user.orders.length}</td>
                                <td className="px-20 py-4 text-sm  text-gray-500">{user.orders.reduce((acc, val) => acc + val.products.length, 0)}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === "Active"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {user.status === "Active" ? (
                                        <button className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm cursor-pointer" onClick={() => SetBlock(user.id)}>
                                            <Lock size={16} /> Block
                                        </button>
                                    ) : (
                                        <button className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm cursor-pointer" onClick={() => Unblock(user.id)}>
                                            <Unlock size={16} /> Unblock
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
            <div className=' flex items-center justify-center text-red-700 mt-10'>
                <div>{notfound}</div>
            </div>
        </div>
    )
}

export default Users