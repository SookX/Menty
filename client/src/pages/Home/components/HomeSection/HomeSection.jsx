import { Box, styled } from "@mui/material"
import Section from "../../../../components/Section/Section"

const HomeSection = ({ children, id="", color = "tertiary" }) => {
    const StyledHomeSection = styled(Box)(({theme})=>({
        backgroundColor: color === "tertiary" ? theme.palette.tertiary.tint2 : color === "primary" ? theme.palette.primary.tint8 : "transparent",
        borderRadius: theme.shape.sectionBorderRadius,
        padding: `${theme.spacing(16)} ${theme.spacing(8)}`,
        [theme.breakpoints.down("md")]: { padding: `${theme.spacing(8)} ${theme.spacing(4)}` },
        margin: theme.spacing(2.5)
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