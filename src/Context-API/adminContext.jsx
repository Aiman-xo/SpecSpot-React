import React, { createContext, useState } from 'react'
export const adminContext = createContext();

function AdminContext({ children }) {
    let [products, setProducts] = useState([]);

    return (
        <adminContext.Provider value={{ setProducts, products }}>
            {children}
        </adminContext.Provider>
    )
}

export default AdminContext