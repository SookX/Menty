import { useContext, useEffect, useState } from "react"
import Input from "../../components/Input/Input"
import './account.less'
import { DataContext } from "../../context/DataContext"

const Login = () => {
    // Gets global variables
    const { crud, navigate, setAccess, setRefresh } = useContext(DataContext)



    // Checks if the user is already logged in
    useEffect(() => {
        if(localStorage.getItem('access')) navigate('/')
    }, [])



    // Hold the form data
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    // Checks if there is an error
    const [error, setError] = useState(false)



    // Submits the form data to the backend server
    const handleSubmit = async (e) => {
        e.preventDefault()

        const obj = {
            email,
            password
        }

        const response = await crud({
            method: 'post',
            url: '/login/',
            body: obj
        })

        if(response.status == 200) {
            localStorage.setItem('access', response.data.access)
            setAccess(response.data.access)
            localStorage.setItem('refresh', response.data.refresh)
            setRefresh(response.data.refresh)
            navigate('/')
        }
        else setError(response.response.data.error)
    }



    return (
        <section className="full-section account">
            <div className="account-form-container">
                <div className="account-form-textbox">
                    <h4 className="account-title">Log in to your account</h4>

                    {
                        error &&
                        <p className="error">{error}</p>
                    }
                </div>

                <form className="account-form" onSubmit={(e) => handleSubmit(e)}>
                    <Input
                        value={email}
                        setValue={setEmail}
                        type="email"
                        label="Email"
                    />
                    <Input
                        value={password}
                        setValue={setPassword}
                        type="password"
                        label="Password"
                    />

                    <button className="btn" type="submit">Log in to my account</button>
                </form>
            </div>
        </section>
    )
}

export default Login