import { createContext, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const DataContext = createContext({ })

const DataProvider = ({ children }) => {
    // Sets the url for the backend server
    axios.defaults.baseURL = 'http://127.0.0.1:8000/api'



    // Navigates users to different routes
    const navigate = useNavigate()



    // Gets the JWT tokens if the user has logged in
    const [refresh, setRefresh] = useState(localStorage.getItem('refresh') || null)
    const [access, setAccess] = useState(localStorage.getItem('access') || null)



    // Makes a CRUD operation to the backend server
    const crud = async ({ url, method, body = null, headers = null }) => {
        try {
            const config = {
                headers: access ? {
                    'Authorization': `Bearer ${access}`,
                    ...headers
                } : {
                    headers
                }
            }

            let response;
            if (method.toLowerCase() === 'get' || method.toLowerCase() === 'delete') {
                response = await axios[method](url, config);
            } else {
                response = await axios[method](url, body, config);
            }

            if(response) return response
        } catch(err) {
            return err
        }
    }



    // Holds the state for the prompt
    const [prompt, setPrompt] = useState("")



    return (
        <DataContext.Provider
            value={{
                crud, navigate,
                setAccess, setRefresh,
                prompt, setPrompt
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider