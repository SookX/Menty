import { useEffect } from "react"
import Section from "../../components/Section/Section"
import { useContext } from "react"
import { DataContext } from "../../context/DataContext"
import { useState } from "react"
import { Box, Card, Grid, styled, Typography } from "@mui/material"
import DataCard from "./components/DataCard/DataCard"
import PromptCard from "./components/PromptCard/PromptCard"
import AdviceCard from "./components/AdviceCard/AdviceCard"
import { createContext } from "react"
import './dashboard.css'
import { useRef } from "react"
import Loader from "./components/Loader/Loader"

export const DashboardContext = createContext({  })

const StyledGrid = styled(Grid)(({theme})=>({
    padding: `${theme.spacing(6)} ${theme.spacing(8)}`,
    [theme.breakpoints.down("md")]: { padding: `${theme.spacing(6)} ${theme.spacing(4)}` },
    [theme.breakpoints.down("sm")]: { padding: `${theme.spacing(4)} ${theme.spacing(2)}` },
    paddingTop: theme.spacing(16),
    alignItems: "stretch"
}))

const Dashboard = () => {
    // Holds the styles for each section
    const StyledCard = styled(Card)(({theme})=>({
        borderRadius: theme.shape.sectionBorderRadius,
        padding: theme.spacing(5),
        width: "100%",

        [theme.breakpoints.down("md")]: { textAlign: "center" }
    }))



    // Gets global data from the context
    const { crud, navigate, access } = useContext(DataContext)



    // Navigates users to dashboard if they are logged in
    useEffect(() => {
        if(!access) navigate('/login')
    }, [access])



    // Holds the state for the dashboard
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
    const [loading, setLoading] = useState(true)



    // Changes the loading state when everything is loaded
    useEffect(() => {
        if (user && score && anxiety && depression && bipolar && personalityDisorder && stress && suicidal && dates) {
            setLoading(false)
        }
    }, [user, score, anxiety, depression, bipolar, personalityDisorder, stress, suicidal, dates])



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



    // Gets the data from the backend on init
    useEffect(() => {
        const fetching = async () => {
            const response = await crud({
                method: 'get',
                url: '/sentiment/'
            })

            console.log(response)

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
    const remainingTime = useRef(0)
    const remainingString = useRef('')

    // Stores the time for which the button will be disabled
    const time = 86400000

    // Calculates the remaining time if the button is disabled
    useEffect(() => {
        const lastClicked = localStorage.getItem('lastClicked');

        if (lastClicked) {
            const timeElapsed = new Date().getTime() - lastClicked;

            if (timeElapsed < time) {
                setDisabled(true);
                remainingTime.current = time - timeElapsed
            }
        }
    }, []);

    // Get time string from the remaining time
    const getRemainingTimeString = () => {
        const hours = Math.floor((remainingTime.current / 3600000) % 24);
        const minutes = Math.floor((remainingTime.current / 60000) % 60);
        remainingString.current = `${hours} hour(s) and ${minutes} minute(s)`
    }

    // Start a countdown
    useEffect(() => {
        let timer;

        if (disabled) {
            timer = setInterval(() => {
                if (remainingTime.current <= 1000) {
                    clearInterval(timer)
                    setDisabled(false)
                    remainingTime.current = 0
                }
                else remainingTime.current = remainingTime.current - 1000
                getRemainingTimeString()
            }, 1000);
        }

        return () => clearInterval(timer)
    }, [disabled]);

    useEffect(() => {
        getRemainingTimeString()
    }, [remainingTime.current])



    return (
        <DashboardContext.Provider value={{
            StyledCard,
            user, sentiments,
            score, anxiety, bipolar, depression, suicidal, personalityDisorder, stress, dates,
            disabled, setDisabled, remainingTime, remainingString
        }}>
            {
                loading ?
                <Loader />
                :
                <Section>
                    <StyledGrid container rowSpacing={4} columnSpacing={6}>
                        {
                            user &&
                            <Grid sx={{ display: "flex" }} size={{ xs: 12, lg: 7.2}}>
                                <DataCard />
                            </Grid>
                        }
                        <Grid sx={{ display: "flex" }} size={{ xs: 12, lg: 4.8}}>
                            <PromptCard />
                        </Grid>
                        <Grid sx={{ display: "flex" }} size={12}>
                            <AdviceCard />
                        </Grid>
                    </StyledGrid>
                </Section>
            }
        </DashboardContext.Provider>
    )
}

export default Dashboard