import { Card, Grid, styled, Typography } from "@mui/material"

const AboutCard = ({ 
    color = "primary",
    title = "Lorem",
    text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi ea, neque quia dolore, aliquam praesentium assumenda sapiente, dolor impedit animi eaque a illo placeat corrupti eligendi cum blanditiis laborum minus?" 
}) => {
    const StyledCard = styled(Card)(({theme})=>({
        background: theme.palette[color].tint5,
        color: theme.palette[color].tint1,
        padding: "32px",
        textAlign: "center",
        transition: ".2s",
        "&:hover": {
            transform: "scale(1.05)"
        }
    }))

    return (
        <StyledCard>
            <Typography mb={"12px"} variant="h5" color={`${color}.${color === "primary" ? "tint1" : "main"}`}>{title}</Typography>
            <Typography variant="body2">{text}</Typography>
        </StyledCard>
    )
}

export default AboutCard