import { Box, styled } from "@mui/material"
import Section from "../../../../components/Section/Section"

const HomeSection = ({ children, id="", color = "tertiary" }) => {
    const StyledHomeSection = styled(Box)(({theme})=>({
        backgroundColor: color === "tertiary" ? theme.palette.tertiary.tint2 : color === "primary" ? theme.palette.primary.tint8 : "transparent",
        borderRadius: theme.shape.sectionBorderRadius,
        padding: "128px 64px",
        [theme.breakpoints.down("md")]: { padding: "64px 32px" },
        margin: "20px"
    }))

    return (
        <Section id={id}>
            <StyledHomeSection>
                {children}
            </StyledHomeSection>
        </Section>
    )
}

export default HomeSection