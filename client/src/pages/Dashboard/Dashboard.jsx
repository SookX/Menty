import './dashboard.less'
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import Input from "../../components/Input/Input";
import LineChart from './LineChart';



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
        if(user && scores) setLoading(false)
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
        !loading &&
        <section className="full-section dashboard">
            <div className="dashboard-textbox">
                <h3>{user.username}</h3>
                <p>{user.email}</p>
            </div>

            <LineChart data={score} />

            <Input
                value={prompt}
                setValue={setPrompt}
                label="Tell us how you're feeling"
                type="textarea"
            />

            <button className="btn" onClick={handleSubmitSentiment}>Submit</button>

        </section>
    )
}

export default Dashboard