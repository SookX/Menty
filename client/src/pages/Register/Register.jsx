import { useContext, useState } from "react"
import AccountPage from "../../components/AccountPage/AccountPage"
import { DataContext } from "../../context/DataContext"

const Register = () => {
    // Gets global data from the context
    const { crud, navigate } = useContext(DataContext)



    // Holds the state for the form
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)



    // Makes a crud request to the backend to register the user
    const handleSubmit = async (e) => {
        e.preventDefault()
        
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
    }

    return (
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
        />
    )
}

export default Register