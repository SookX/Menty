import { useContext, useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import './account.less';
import { DataContext } from "../../context/DataContext";
import { GoogleLogin } from '@react-oauth/google'; // Ensure correct import

const Login = () => {
    const { crud, navigate, setAccess, setRefresh } = useContext(DataContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('access')) navigate('/dashboard');
    }, []);

    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const obj = { email, password };

        const response = await crud({
            method: 'post',
            url: '/login/',
            body: obj,
        });

        if (response.status === 200) {
            localStorage.setItem('access', response.data.access);
            setAccess(response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            setRefresh(response.data.refresh);
            navigate('/dashboard');
        } else {
            setError(response.response.data.error);
        }

        setLoading(false);
    };

    const handleGoogleLoginSuccess = async (credentialResponse) => {
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

        if (response.status === 200) {
            localStorage.setItem('access', response.data.access);
            setAccess(response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            setRefresh(response.data.refresh);
            navigate('/dashboard');
        } else {
            setError('Google Login failed');
        }
    };

    const handleGoogleLoginFailure = () => {
        setError('Google Login failed');
    };

    return (
        <section className="full-section account">
            {loading && <div className="loader"></div>}
            <div className="account-form-container">
                <div className="account-form-textbox">
                    <h4 className="account-title">Log in to your account</h4>
                    {error && <p className="error">{error}</p>}
                </div>
                <form className="account-form" onSubmit={handleSubmit}>
                    <Input value={email} setValue={setEmail} type="email" label="Email" />
                    <Input value={password} setValue={setPassword} type="password" label="Password" />
                    <button className="btn" type="submit">Log in to my account</button>
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginFailure}
                        logo_alignment="left" 
                    />
                </form>
            </div>
        </section>
    );
};

export default Login;
