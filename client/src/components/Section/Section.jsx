import { Box, styled } from "@mui/material"

const StyledSection = styled(Box)({
    minHeight: "100vh",
})

const Section = ({ children, id="" }) => {
    return (
        <StyledSection id={id}>
            {children}
        </StyledSection>
    )
}

export default Section