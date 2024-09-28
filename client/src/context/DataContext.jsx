import { createContext, useEffect, useState } from "react";

export const DataContext = createContext({})

const DataProvider = ({ children }) => {

    const [grid, setGrid] = useState(true)

    return (
        <DataContext.Provider value={{
                grid, setGrid
            }}>

            {children}

        </DataContext.Provider>
    )
}

export default DataProvider