import AccountPage from "../../components/AccountPage/AccountPage"
import { Google } from "@mui/icons-material"

const Login = () => {
    return (
        <AccountPage
            title="Log in to your account"
            inputs={[
                {
                    label: "Email",
                    type: "email"
                },
                {
                    label: "Password",
                    type: "password"
                },
            ]}
            button="Log in to my account"
            oauth={[
                {
                    label: "Log in with Google",
                    icon: (<Google />)
                }
            ]}
        />
    )
}

export default Login