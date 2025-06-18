import { Box, styled } from "@mui/material"
import Section from "../../../../components/Section/Section"

const HomeSection = ({ children, color = "tertiary" }) => {
    const StyledHomeSection = styled(Box)(({theme})=>({
        backgroundColor: color === "tertiary" ? theme.palette.tertiary.tint2 : color === "primary" ? theme.palette.primary.tint8 : "transparent",
        borderRadius: theme.shape.sectionBorderRadius,
        padding: "128px 64px"
    }))

    return (
        <Section>
            <StyledHomeSection>
                {children}
            </StyledHomeSection>
        </Section>
    )
}

export default HomeSection