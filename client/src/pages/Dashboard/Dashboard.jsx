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
            }
        }

        fetching()
    }, [])



    // Stores the state of the submit button
    const [disabled, setDisabled] = useState(false)

    // Stores the remaining time till the button can be clicked again
    const [remainingTime, setRemainingTime] = useState(0)
    const [remainingString, setRemainingString] = useState('')

    // Stores the time for which the button will be disabled
    const time = 86400000

    // Calculates the remaining time if the button is disabled
    useEffect(() => {
        const lastClicked = localStorage.getItem('lastClicked');

        if (lastClicked) {
            const timeElapsed = new Date().getTime() - lastClicked;

            if (timeElapsed < time) {
                setDisabled(true);
                setRemainingTime(time - timeElapsed); 
            }
        }
    }, []);

    // Start a countdown
    useEffect(() => {
        let timer;

        if (disabled) {
            timer = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime <= 1000) {
                        clearInterval(timer)
                        setDisabled(false)
                        return 0;
                    }
                    return prevTime - 1000;
                });
            }, 1000);
        }

        return () => clearInterval(timer)
    }, [disabled]);

    // Get time string from the remaining time
    const getRemainingTimeString = () => {
        const hours = Math.floor((remainingTime / 3600000) % 24);
        const minutes = Math.floor((remainingTime / 60000) % 60);
        setRemainingString(`${hours} hour(s) and ${minutes} minute(s)`)
    }

    useEffect(() => {
        getRemainingTimeString()
    }, [remainingTime])



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

        if(response.status == 201) {
            localStorage.setItem('lastClicked', new Date().getTime())
            setDisabled(true)
            setRemainingTime(time)
            window.location.reload(false)
        }

        setLoadingSentiment(false)
    }


    return (
        <DashboardContext.Provider value={{
            loading, user, loadingSentiment, handleSubmitSentiment, sentiments,
            score, anxiety, bipolar, depression, suicidal, personalityDisorder, stress, dates,
            disabled, remainingString
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