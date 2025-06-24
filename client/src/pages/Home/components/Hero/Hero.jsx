import { Box, Button, Card, Container, Dialog, Modal, Stack, styled, TextField, Typography } from "@mui/material"
import HomeSection from "../HomeSection/HomeSection"
import hero1 from "../../../../img/hero1.webp"
import { useContext } from "react"
import { DataContext } from "../../../../context/DataContext"
import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import PopUp from "./components/PopUp/PopUp"

const StyledContainer = styled(Container)(({theme})=>({
    width: "60%",
    [theme.breakpoints.down("lg")]: { width: "75%" },
    [theme.breakpoints.down("md")]: { width: "90%" },
    [theme.breakpoints.down("sm")]: { width: "100%" },
    // background: "aqua",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center"
}))

const Hero = () => {
    // Gets global data from the context
    const { prompt, setPrompt, navigate, access } = useContext(DataContext)



    // Holds the reference for the input
    const inputRef = useRef()



    // Navigates the users when they submit a prompt from the home page
    const [modal, setModal] = useState(false)

    const handleNavigate = () => {
        setPrompt(inputRef.current.value)

        if(access) navigate('dashboard')
        else setModal(true)
    }



    return (
        <HomeSection color="tertiary">
            <PopUp
                open={modal}
                onClose={() => setModal(false)}
            />

            <StyledContainer>
                <img src={hero1} className="hero-img" />

                <Typography mb={4} variant="h1" color="tertiary.shade1">You're not alone!</Typography>

                <Typography mb={4} variant="body1">We are here to help you! Use our tool to track your mental health and get daily advice to improve your life. Tell us how you are feeling today - your mood, your activities and our AI will analyze your state and track your mental health every day.</Typography>

                <Stack gap={1} sx={{ width: { xs: "100%", lg: "90%" } }}>
                    <TextField
                        variant="outlined"
                        placeholder="Tell us how you're feeling..."
                        color="tertiary" 
                        multiline 
                        rows={9}
                        defaultValue={prompt}
                        inputRef={inputRef}
                    />

                    <Button onClick={handleNavigate} variant="contained" color="tertiary">Analyze my mental health</Button>
                </Stack>
            </StyledContainer>
        </HomeSection>
    )
}

export default Hero