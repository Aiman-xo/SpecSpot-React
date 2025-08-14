import React, { useState } from 'react'
import { createContext } from 'react'

export const searchContext = createContext();

function Context({ children }) {
    let [search, setSearch] = useState("");
    return (
        <div>
            <searchContext.Provider value={{ search, setSearch }}>
                {children}
            </searchContext.Provider>
        </div>
    )
}

export default Context