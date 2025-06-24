import { useContext } from "react"
import { DashboardContext } from "../../Dashboard"
import dashboard from "../../../../img/dashboard.webp"
import { Box, Button, styled, TextField, Typography } from "@mui/material"
import { theme } from "../../../../theme/theme"
import { DataContext } from "../../../../context/DataContext"
import { useRef } from "react"
import { useEffect } from "react"

const PromptCard = () => {
    // Gets dashboard data from the context
    const { StyledCard, disabled, setDisabled, remainingTime, remainingString } = useContext(DashboardContext)
    const { prompt, crud } = useContext(DataContext)



    // Holds the ref for the input
    const inputRef = useRef()



    // Applies specific styles to the section
    const StyledPromptCard = styled(StyledCard)(({theme})=>({
        backgroundColor: theme.palette.tertiary.tint1,
        color: theme.palette.text.main,
        
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(1.5)
    }))



    // Stores the time for which the button will be disabled
    const time = 86400000



    // Makes a request to the backend with the new sentiment
    const handleSubmitSentiment = async () => {
        const response = await crud({
            method: "post",
            url: '/sentiment/',
            body: {
                emotion: inputRef.current.value
            }
        })

        if(response.status == 201) {
            localStorage.setItem('lastClicked', new Date().getTime())
            setDisabled(true)
            remainingTime.current = time
            window.location.reload(false)
        }
    }



    return (
        <StyledPromptCard>
            <img src={dashboard} alt="girl" className="dashboard-img" />

            <Box textAlign={"center"}>
                <Typography variant="h5" color="secondary.tint3">How are you feeling today?</Typography>
                {
                    disabled ?
                    <Typography variant="body1">You can write again in {remainingString.current}</Typography>
                    :
                    <Typography variant="body1">Tell us about your day. How are you feeling?</Typography>
                }
            </Box>

            <TextField
                color="tertiary"
                fullWidth 
                rows={7} 
                multiline
                inputRef={inputRef}
                defaultValue={prompt}
            />
            <Button onClick={handleSubmitSentiment} disabled={disabled} variant="contained" fullWidth color="tertiary">Submit</Button>
        </StyledPromptCard>
    )
}

export default PromptCard