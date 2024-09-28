import { useContext, useEffect, useState } from "react"
import Input from "../../components/Input/Input"
import './account.less'
import { DataContext } from "../../context/DataContext"

const Register = () => {
    // Gets global variables
    const { crud, navigate } = useContext(DataContext)



    // Checks if the user is already logged in
    useEffect(() => {
        if(localStorage.getItem('access')) navigate('/dashboard')
    }, [])



    // Hold the form data
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')



    // Checks if there is an error
    const [error, setError] = useState(false)



    // Submits the form data to the backend server
    const handleSubmit = async (e) => {
        e.preventDefault()

        const obj = {
            email,
            username,
            password
        }

        const response = await crud({
            method: 'post',
            url: '/register/',
            body: obj
        })

        console.log(response)
        
        if(response.status == 201) navigate('/login')
        else setError(response.response.data.error)

        console.log(error)
    }

    return (
        <section className="full-section account">
            <div className="account-form-container">
                <div className="account-form-textbox">
                    <h4 className="account-title">Make an account</h4>

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
                        value={username}
                        setValue={setUsername}
                        label="Username"
                    />
                    <Input
                        value={password}
                        setValue={setPassword}
                        type="password"
                        label="Password"
                    />

                    <button className="btn" type="submit">Make my account</button>
                </form>
            </div>
        </section>

    )
}

export default Register