import { useContext } from "react"
import { DashboardContext } from "../../Dashboard"
import { Box, Typography } from "@mui/material"

const DataCard = () => {
    // Gets dashboard data from the context
    const { StyledCard, user } = useContext(DashboardContext)



    return (
        <StyledCard sx={{ backgroundColor: "primary.tint8", color: "text.tint3" }}>
            { user && user.username && <Typography variant="h3" color="primary">{user.username}</Typography> }
            { user && user.email && <Typography mb={1.5} variant="body1" textTransform="uppercase" fontWeight="bold" color="secondary.tint3">{user.email}</Typography> }

            <Typography variant="body1">Welcome to your dashboard! Here you can find your mental health progress as well as your daily tips for improvement. The chart below shows your mental state over the last 30 days.</Typography>

            <Box>Chart :{`(`}</Box>
        </StyledCard>
    )
}

export default DataCard