import { Box, Stack, Typography } from "@mui/material"
import HomeSection from "../HomeSection/HomeSection"
import about from "../../../../img/about.webp"
import Info from "./components/Info/Info"

const About = () => {
    return (
        <HomeSection id="about" color="primary">
            <Stack direction={"row"} justifyContent={"space-between"} gap={3} alignItems={"center"}>
                <Info />
                <img src={about} alt="Umbrella" className="about-img" />
            </Stack>
        </HomeSection>
    )
}

export default About