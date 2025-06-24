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

export const DashboardContext = createContext({  })

const StyledGrid = styled(Grid)(({theme})=>({
    padding: "48px 64px",
    [theme.breakpoints.down("md")]: { padding: "48px 32px" },
    [theme.breakpoints.down("sm")]: { padding: "32px 16px" },
    paddingTop: "128px",
    alignItems: "stretch"
}))

const Dashboard = () => {
    // Holds the styles for each section
    const StyledCard = styled(Card)(({theme})=>({
        borderRadius: theme.shape.sectionBorderRadius,
        padding: "40px",
        width: "100%",

        [theme.breakpoints.down("md")]: { textAlign: "center" }
    }))



    // Gets global data from the context
    const { crud } = useContext(DataContext)



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



    return (
        <DashboardContext.Provider value={{
            StyledCard,
            user, sentiments,
            score, anxiety, bipolar, depression, suicidal, personalityDisorder, stress, dates
        }}>
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
        </DashboardContext.Provider>
    )
}

export default Dashboard