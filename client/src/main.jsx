import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.less'
import './globalStyling/components.less'
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = '916906730222-hktkvhefo2ptkq1r391vrpvthkk18rsn.apps.googleusercontent.com'

createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={clientId}>
        <App />
    </GoogleOAuthProvider>
    
)
