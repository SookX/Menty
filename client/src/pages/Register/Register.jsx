import { useContext, useState } from "react"
import AccountPage from "../../components/AccountPage/AccountPage"
import { DataContext } from "../../context/DataContext"
import Loader from "../Dashboard/components/Loader/Loader"
import { useEffect } from "react"
import { GoogleLogin } from '@react-oauth/google';

const Register = () => {
    // Gets global data from the context
    const { crud, navigate, access } = useContext(DataContext)



    // Navigates users to dashboard if they are logged in
    useEffect(() => {
        if(access) navigate('/dashboard')
    }, [access])



    // Holds the state for the form
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)



    // Makes a crud request to the backend to register the user
    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        
        const response = await crud({
            method: 'post',
            url: '/register/',
            body: {
                email,
                username,
                password
            }
        })

        if(response.status == 201) navigate('/login')
        else setError(response.response.data.error)

        setLoading(false)
    }



    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }


    const handleGoogleLoginSuccess = async (credentialResponse) => {
        console.log(credentialResponse)
        const token = credentialResponse.credential;
        const decodedToken = parseJwt(token);

        const response = await crud({
            method: 'post',
            url: '/google-login/',
            body: {
                token,
                email: decodedToken.email,
            },
        });

        console.log(response)

        if (response.status === 200) {
            localStorage.setItem('access', response.data.access);
            setAccess(response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            setRefresh(response.data.refresh);
            navigate('/dashboard');
        } else {
            setError('Google register failed.');
        }
    };

    const handleGoogleLoginFailure = () => {
        setError('Google register failed.');
    };



    return (
        <>
            { loading && <Loader /> }
            <AccountPage
                title="Make an account"
                errorMsg={error}
                inputs={[
                    {
                        label: "Email",
                        type: "email",
                        value: email,
                        setValue: setEmail
                    },
                    {
                        label: "Username",
                        type: "text",
                        value: username,
                        setValue: setUsername
                    },
                    {
                        label: "Password",
                        type: "password",
                        value: password,
                        setValue: setPassword
                    },
                ]}
                button="Make my account"
                handleSubmit={handleSubmit}
                oauth={[
                    {
                        component: (
                            <GoogleLogin
                                onSuccess={handleGoogleLoginSuccess}
                                onError={handleGoogleLoginFailure}
                                size="large"
                            />
                        )
                    }
                ]}
            />
        </>
    )
}

export default Register