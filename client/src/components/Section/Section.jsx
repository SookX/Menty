import { Box, styled } from "@mui/material"

const StyledSection = styled(Box)({
    minHeight: "100vh",
})

const Section = ({ children }) => {
    return (
        <StyledSection>
            {children}
        </StyledSection>
    )
}

export default Section