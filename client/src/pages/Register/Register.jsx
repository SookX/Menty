import AccountPage from "../../components/AccountPage/AccountPage"

const Register = () => {
    return (
        <AccountPage
            title="Make an account"
            inputs={[
                {
                    label: "Email",
                    type: "email"
                },
                {
                    label: "Username",
                    type: "text"
                },
                {
                    label: "Password",
                    type: "password"
                },
            ]}
            button="Make my account"
        />
    )
}

export default Register