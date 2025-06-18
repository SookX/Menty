import AppBar from "@mui/material/AppBar"
import logo from "../../img/logo.webp"
import './header.css'
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import Toolbar from "@mui/material/Toolbar"
import Stack from "@mui/material/Stack"
import App from "../../App"

const StyledNavlink = styled(Button)(({theme})=>({
    fontWeight: "bold",
    transition: ".2s",
    color: theme.palette.primary.tint2,
    '&:hover': {
        color: theme.palette.secondary.tint2
    }
}))

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
})

const Header = () => {
    return (
        <AppBar position="static" elevation={2} color="transparent">
            <StyledToolbar variant="dense" disableGutters>
                <Stack direction={"row"} alignItems={"center"} gap={4}>
                    <img src={logo} className="nav-logo" />

                    <Box>
                        <StyledNavlink>How it works</StyledNavlink>
                    </Box>
                </Stack>

                <Stack direction={"row"} gap={4}>
                    <StyledNavlink>Log in</StyledNavlink>
                    <StyledNavlink>Sign up</StyledNavlink>
                </Stack>
            </StyledToolbar>
        </AppBar>
    )
}

export default Header