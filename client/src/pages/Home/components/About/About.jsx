import { Box, Stack, styled, Typography } from "@mui/material"
import HomeSection from "../HomeSection/HomeSection"
import about from "../../../../img/about.webp"
import Info from "./components/Info/Info"

const StyledStack = styled(Stack)(({ theme })=>({
    [theme.breakpoints.up("lg")]: { 
        flexDirection: "row",
        gap: theme.spacing(3)
    },

    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.spacing(6),

    [theme.breakpoints.down("md")]: {
        textAlign: "center"
    }
}))

const About = () => {
    return (
        <HomeSection id="about" color="primary">
            <StyledStack>
                <Info />
                <img src={about} alt="Umbrella" className="about-img" />
            </StyledStack>
        </HomeSection>
    )
}

export default About