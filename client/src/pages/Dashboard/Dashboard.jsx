import './dashboard.less'
import { createContext, useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import Input from "../../components/Input/Input";
import LineChart from './LineChart';
import ChartSection from './ChartSection';
import StepSection from './StepSection';


export const DashboardContext = createContext({})

const Dashboard = () => {
    // Gets global data from the context
    const { navigate, crud, prompt, setPrompt } = useContext(DataContext)



    // Stores the dashboard data
    const [user, setUser] = useState(null)
    const [sentiments, setSentiments] = useState(null)
    const [scores, setScores] = useState(null)



    // Gets the scores from each sentiment
    useEffect(() => {
        if (sentiments) setScores(sentiments.map(sentiment => sentiment.score))
    }, [sentiments])

    const score = [15, 1, 24, 8, 7, 5, 16, 32, 9]



    // Stores the loading state
    const [loading, setLoading] = useState(true)
    const [loadingSentiment, setLoadingSentiment] = useState(false)

    // Changes the loading state when everything is loaded
    useEffect(() => {
        if (user && scores)
            setTimeout(() => {
                setLoading(false)
            }, 5000)
        if (user && scores)
            setLoading(false)
    }, [user, scores])



    // Checks if user is not logged in
    useEffect(() => {
        if (!localStorage.getItem('access')) navigate('/login')
    }, [])



    // Gets the dashboard data from the backend
    useEffect(() => {
        const fetching = async () => {
            const response = await crud({
                method: 'get',
                url: '/sentiment/'
            })

            if (response.status == 200) {
                setUser(response.data.user)
                setSentiments(response.data.sentiments)
            }

            console.log(response)
        }

        fetching()
    }, [])



    // Makes a request to the backend with the new sentiment
    const handleSubmitSentiment = async () => {
        setLoadingSentiment(true)

        const obj = {
            emotion: prompt
        }

        const response = await crud({
            method: "post",
            url: '/sentiment/',
            body: obj
        })

        console.log(response)
        setLoadingSentiment(false)
    }


    return (
        <DashboardContext.Provider value={{
            loading, score, user, loadingSentiment, handleSubmitSentiment
        }}>
            {
                loading ?
                    <div class="loader"></div>
                    :
                    <>
                        <ChartSection />
                        <StepSection />
                    </>
            }
        </DashboardContext.Provider>
    )
}

export default Dashboard