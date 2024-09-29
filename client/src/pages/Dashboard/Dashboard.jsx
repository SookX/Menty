import './dashboard.less'
import { createContext, useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import ChartSection from './ChartSection';
import StepSection from './StepSection';


export const DashboardContext = createContext({})

const Dashboard = () => {
    // Gets global data from the context
    const { navigate, crud, prompt } = useContext(DataContext)



    // Stores the dashboard data
    const [user, setUser] = useState(null)
    const [sentiments, setSentiments] = useState(null)
    const [score, setScore] = useState(null)
    const [anxiety, setAnxiety] = useState(null)
    const [bipolar, setBipolar] = useState(null)
    const [depression, setDepression] = useState(null)
    const [personalityDisorder, setPersonalityDisorder] = useState(null)
    const [stress, setStress] = useState(null)
    const [suicidal, setSuicidal] = useState(null)
    const [dates, setDates] = useState(null)



    // Gets the scores from each sentiment
    useEffect(() => {
        if (sentiments) {
            setScore(sentiments.map(sentiment => sentiment.normal_score))
            setAnxiety(sentiments.map(sentiment => sentiment.anxiety_score))
            setBipolar(sentiments.map(sentiment => sentiment.bipolar_score))
            setDepression(sentiments.map(sentiment => sentiment.depression_score))
            setPersonalityDisorder(sentiments.map(sentiment => sentiment.personality_disorder_score))
            setStress(sentiments.map(sentiment => sentiment.stress_score))
            setSuicidal(sentiments.map(sentiment => sentiment.suicidal_score))
            setDates(sentiments.map((sentiment) => sentiment.date.split('T')[0]))
        }
    }, [sentiments])



    // Stores the loading state
    const [loading, setLoading] = useState(true)
    const [loadingSentiment, setLoadingSentiment] = useState(false)

    // Changes the loading state when everything is loaded and puts the scores into one array
    useEffect(() => {
        if (user && score && anxiety && depression && bipolar && personalityDisorder && stress && suicidal && dates) {
            setLoading(false)
        }
    }, [user, score, anxiety, depression, bipolar, personalityDisorder, stress, suicidal, dates])



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
                // let sentimentsRaw = response.data.sentiments
                // setSentiments(sentimentsRaw.sort((a, b) => new Date(a.date) - new Date(b.date)))
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
            loading, user, loadingSentiment, handleSubmitSentiment, sentiments,
            score, anxiety, bipolar, depression, suicidal, personalityDisorder, stress, dates
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