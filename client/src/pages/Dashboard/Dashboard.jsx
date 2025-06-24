import { useEffect } from "react"
import Section from "../../components/Section/Section"
import { useContext } from "react"
import { DataContext } from "../../context/DataContext"
import { useState } from "react"
import { Box, Grid, Typography } from "@mui/material"
import DataCard from "./components/DataCard/DataCard"
import PromptCard from "./components/PromptCard/PromptCard"
import AdviceCard from "./components/AdviceCard/AdviceCard"

const Dashboard = () => {
    // Gets global data from the context
    const { crud } = useContext(DataContext)



    // Holds the state for the dashboard
    const [user, setUser] = useState(null)



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
                // setSentiments(response.data.sentiments)
            }
        }

        fetching()
    }, [])



    return (
        <Section>
            <Grid container rowGap={4} columnGap={6}>
                <Grid size={8}>
                    <DataCard />
                </Grid>
                <Grid size={4}>
                    <PromptCard />
                </Grid>
                <Grid size={"grow"}>
                    <AdviceCard />
                </Grid>
            </Grid>
        </Section>
    )
}

export default Dashboard