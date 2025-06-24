import { useContext } from "react"
import { DashboardContext } from "../../Dashboard"
import { Box, styled, Typography } from "@mui/material"
import LineChart from "./components/LineChart/LineChart"
import { theme } from "../../../../theme/theme"

const DataCard = () => {
    // Gets dashboard data from the context
    const { StyledCard, user } = useContext(DashboardContext)



    // Applies specific styles to the section
    const StyledDataCard = styled(StyledCard)(({theme})=>({
        backgroundColor: theme.palette.primary.tint8,
        color: theme.palette.text.tint3
    }))



    return (
        <StyledDataCard>
            { user && user.username && <Typography variant="h3" color="primary">{user.username}</Typography> }
            { user && user.email && <Typography mb={1.5} variant="body1" textTransform="uppercase" fontWeight="bold" color="secondary.tint3">{user.email}</Typography> }

            <Typography mb={4} variant="body1">Welcome to your dashboard! Here you can find your mental health progress as well as your daily tips for improvement. The chart below shows your mental state over the last 30 days.</Typography>

            <LineChart />
        </StyledDataCard>
    )
}

export default DataCard