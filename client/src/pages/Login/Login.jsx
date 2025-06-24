import { useContext } from "react"
import AccountPage from "../../components/AccountPage/AccountPage"
import { DataContext } from "../../context/DataContext"
import { useState } from "react"
import { useEffect } from "react"
import Loader from "../Dashboard/components/Loader/Loader"
import { Stack, Typography } from "@mui/material"
import { Google } from "@mui/icons-material";

const Login = () => {
    // Gets global data from the context
    const { crud, navigate, access, setAccess, setRefresh } = useContext(DataContext)



    // Navigates users to dashboard if they are logged in
    useEffect(() => {
        if(access) navigate('/dashboard')
    }, [access])



    // Holds the state for the form
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)



    // Makes a crud request to the backend to register the user
    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        
        const response = await crud({
            method: 'post',
            url: '/login/',
            body: {
                email,
                password
            }
        })

        if (response.status === 200) {
            localStorage.setItem('access', response.data.access);
            setAccess(response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            setRefresh(response.data.refresh);
            navigate('/dashboard');
        } else {
            setError(response.response.data.error);
        }

        setLoading(false)
    }



    return (
        <>
            { loading && <Loader /> }
            <AccountPage
                title="Log in to your account"
                errorMsg={error}
                inputs={[
                    {
                        label: "Email",
                        type: "email",
                        value: email,
                        setValue: setEmail
                    },
                    {
                        label: "Password",
                        type: "password",
                        value: password,
                        setValue: setPassword
                    },
                ]}
                button="Log in to my account"
                handleSubmit={handleSubmit}
            />
        </>
    )
}

export default Login