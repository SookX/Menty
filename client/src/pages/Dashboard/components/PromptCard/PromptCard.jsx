import { useContext } from "react"
import { DashboardContext } from "../../Dashboard"
import dashboard from "../../../../img/dashboard.webp"
import { Box, Button, styled, TextField, Typography } from "@mui/material"
import { theme } from "../../../../theme/theme"

const PromptCard = () => {
    // Gets dashboard data from the context
    const { StyledCard } = useContext(DashboardContext)



    // Applies specific styles to the section
    const StyledPromptCard = styled(StyledCard)(({theme})=>({
        backgroundColor: theme.palette.tertiary.tint1,
        color: theme.palette.text.main,
        
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(1.5)
    }))



    return (
        <StyledPromptCard>
            <img src={dashboard} alt="girl" className="dashboard-img" />

            <Box>
                <Typography variant="h5" color="secondary.tint3">How are you feeling today?</Typography>
                <Typography variant="body1">Tell us about your day. How are you feeling?</Typography>
            </Box>

            <TextField color="tertiary" fullWidth rows={7} multiline />
            <Button variant="contained" fullWidth color="tertiary">Submit</Button>
        </StyledPromptCard>
    )
}

export default PromptCard