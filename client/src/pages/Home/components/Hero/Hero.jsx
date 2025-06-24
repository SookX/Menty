import { Box, Button, Container, Stack, styled, TextField, Typography } from "@mui/material"
import HomeSection from "../HomeSection/HomeSection"
import hero1 from "../../../../img/hero1.webp"

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
    return (
        <HomeSection color="tertiary">
            <StyledContainer>
                <img src={hero1} className="hero-img" />

                <Typography mb={4} variant="h1" color="tertiary.shade1">You're not alone!</Typography>

                <Typography mb={4} variant="body1">We are here to help you! Use our tool to track your mental health and get daily advice to improve your life. Tell us how you are feeling today - your mood, your activities and our AI will analyze your state and track your mental health every day.</Typography>

                <Stack gap={1} sx={{ width: { xs: "100%", lg: "90%" } }}>
                    <TextField variant="outlined" placeholder="Tell us how you're feeling..." color="tertiary" multiline rows={9} />

                    <Button variant="contained" color="tertiary">Analyze my mental health</Button>
                </Stack>
            </StyledContainer>
        </HomeSection>
    )
}

export default Hero