import { Box, Stack, Typography } from "@mui/material"
import AboutCard from "./components/AboutCard/AboutCard"

const Info = () => {
    return (
        <Box>
            <Typography variant="h1" color="primary" mb={1}>How it works</Typography>

            <Typography mb={4} variant="body1">There are many mental health apps available, but none of them quite fit the level of personalized care and insights that users truly need. That's why Menty.AI was created—to offer an enhanced, AI-driven solution for mental wellness that feels tailored to each individual. Here's why:</Typography>

            <Stack mb={3} direction={"row"} gap={3}>
                <AboutCard
                    color="primary"
                    title="Personalized"
                    text="Your mental health is unique, and the support you receive should be too. Menty.AI focuses on providing personalized mental wellness recommendations, and self-care strategies."
                />
                <AboutCard
                    color="secondary"
                    title="Automated"
                    text="You shouldn't have to search for tools or techniques to take care of your mental health. Menty.AI automates this process, making it simple and seamless for you to focus on what matters most—your well-being."
                />
                <AboutCard
                    color="primary"
                    title="Steps"
                    text="Leveraging the power of AI, Menty.AI offers insights based on your emotional patterns, helping you develop a deeper understanding of your mental health while suggesting actionable steps for improvement."
                />
            </Stack>

            <Typography variant="body1">Of course, no one solution works for everyone. That's why Menty.AI continues to evolve. We're open to feedback and ideas from users like you, helping us make this assistant even more helpful. Feel free to suggest changes by contributing to this project or submitting feedback. Thanks to everyone who has supported the development of Menty.AI so far!</Typography>
        </Box>
    )
}

export default Info