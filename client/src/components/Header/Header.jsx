import AppBar from "@mui/material/AppBar"
import logo from "../../img/logo.webp"
import './header.css'
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import Toolbar from "@mui/material/Toolbar"
import Stack from "@mui/material/Stack"
import { Link, Typography } from "@mui/material"
import { HashLink } from 'react-router-hash-link'
import { Link as ReactLink } from 'react-router-dom'

const StyledNavlink = styled(Link)(({theme})=>({
    fontWeight: "bold",
    textDecoration: "none",
    cursor: "pointer",
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
        <AppBar position="sticky" elevation={2} color="transparent">
            <StyledToolbar variant="dense" disableGutters>
                <Stack direction={"row"} alignItems={"center"} gap={4}>
                    <img src={logo} className="nav-logo" />

                    <Box>
                        <StyledNavlink component={HashLink} to="/#about">How it works</StyledNavlink>
                    </Box>
                </Stack>

                <Stack direction={"row"} gap={4}>
                    <StyledNavlink component={ReactLink} to="/login">Log in</StyledNavlink>
                    <StyledNavlink component={ReactLink} to="/register">Sign up</StyledNavlink>
                </Stack>
            </StyledToolbar>
        </AppBar>
    )
}

export default Header