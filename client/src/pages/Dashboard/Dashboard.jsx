import './dashboard.less'
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import Input from "../../components/Input/Input";
import LineChart from './LineChart';
import dashboard from '../../img/dashboard.png'



const Dashboard = () => {
    // Gets global data from the context
    const { navigate, crud, prompt, setPrompt } = useContext(DataContext)



    // Stores the dashboard data
    const [user, setUser] = useState(null)
    const [sentiments, setSentiments] = useState(null)
    const [scores, setScores] = useState(null)



    // Gets the scores from each sentiment
    useEffect(() => {
        if(sentiments) setScores(sentiments.map(sentiment => sentiment.score))
    }, [sentiments])

    const score = [15, 1, 24, 8, 7, 5, 16, 32, 9]



    // Stores the loading state
    const [loading, setLoading] = useState(true)

    // Changes the loading state when everything is loaded
    useEffect(() => {
        if(user && scores) 
            setTimeout(() => {
                setLoading(false)
            }, 5000)
    }, [user, scores])



    // Checks if user is not logged in
    useEffect(() => {
        if(!localStorage.getItem('access')) navigate('/login')
    }, [])



    // Gets the dashboard data from the backend
    useEffect(() => {
        const fetching = async () => {
            const response = await crud({
                method: 'get',
                url: '/sentiment/'
            })

            if(response.status == 200) {
                setUser(response.data.user)
                setSentiments(response.data.sentiments)
            }

            console.log(response)
        }

        fetching()
    }, [])



    // Makes a request to the backend with the new sentiment
    const handleSubmitSentiment = async () => {
        const obj = {
            emotion: prompt
        }

        const response = await crud({
            method: "post",
            url: '/sentiment/',
            body: obj
        })

        console.log(response)
    }
    

    return (
        // loading ?
        <div class="loader"></div>
        // :
        // <section className="full-section dashboard">
        //     <div className="dashboard-left">
        //         <div className="dashboard-textbox">
        //             <h3 className='dashboard-title'>{user.username}</h3>
        //             <p className='dashboard-email'>{user.email}</p>
        //             <p className='dashboard-text'>Welcome to your dashboard! Here you can find your mental health progress as well as your daily tips for improvement.</p>
        //         </div>

        //         <LineChart data={score} />
        //     </div>

        //     <div className="dashboard-right">
        //         <img src={dashboard} alt="Woman thinking" className='dashboard-img' />

        //         <div className="dashboard-labelbox">
        //             <h5>How are you feeling today?</h5>
        //             <p>Tell us about your day. How are you feeling?</p>
        //         </div>

        //         <Input
        //             value={prompt}
        //             setValue={setPrompt}
        //             type="textarea"
        //         />

        //         <button className="btn" onClick={handleSubmitSentiment}>Submit</button>
        //     </div>

        // </section>
    )
}

export default Dashboard