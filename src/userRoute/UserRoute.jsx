import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function UserRoute() {

    const adminId = localStorage.getItem("role");
    if (adminId === "user") {
        return <Outlet />
    } else {
        return <Navigate to={'/'} />
    }

}

export default UserRoute