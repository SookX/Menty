import AppBar from "@mui/material/AppBar"
import logo from "../../img/logo.webp"
import './header.css'
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import Toolbar from "@mui/material/Toolbar"
import Stack from "@mui/material/Stack"
import { Divider, Drawer, Link, Typography } from "@mui/material"
import { HashLink } from 'react-router-hash-link'
import { Link as ReactLink } from 'react-router-dom'
import { useContext } from "react"
import { DataContext } from "../../context/DataContext"
import { Draw, Menu } from "@mui/icons-material"
import { useState } from "react"
import logoTab from '../../img/logoTab.webp'

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

const StyledDrawer = styled(Box)(({theme})=>({
    padding: theme.spacing(2),
    paddingRight: theme.spacing(5)
}))

const Header = () => {
    // Gets global data from the context
    const { access, setAccess, setRefresh, navigate } = useContext(DataContext)



    // Deletes the authentication tokens of the user
    const handleLogOut = () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        setAccess(null)
        setRefresh(null)
        navigate('/login')
    }



    // Holds the state for the mobile menu
    const [open, setOpen] = useState(false)



    return (
        <AppBar position="sticky" elevation={2} color="transparent">
            <StyledToolbar sx={{ display: { xs: "none", sm: "flex" } }} variant="dense" disableGutters>
                <Stack direction={"row"} alignItems={"center"} gap={4}>
                    <ReactLink to='/'><img src={logo} className="nav-logo" /></ReactLink>

                    <Stack direction={"row"} gap={4}>
                        <StyledNavlink component={HashLink} to="/#about">How it works</StyledNavlink>
                        { access && <StyledNavlink component={ReactLink} to="/dashboard">Dashboard</StyledNavlink> }
                    </Stack>
                </Stack>

                {
                    access ?
                    <StyledNavlink onClick={handleLogOut}>Log out</StyledNavlink>
                    :
                    <Stack direction={"row"} gap={4}>
                        <StyledNavlink component={ReactLink} to="/login">Log in</StyledNavlink>
                        <StyledNavlink component={ReactLink} to="/register">Sign up</StyledNavlink>
                    </Stack>
                }
            </StyledToolbar>

            <StyledToolbar sx={{ display: { xs: "flex", sm: "none" } }} variant="dense" disableGutters>
                <ReactLink to='/'><img src={logo} className="nav-logo" /></ReactLink>

                <Menu onClick={() => setOpen(!open)} sx={{ color: "primary.tint2" }} />

                <Drawer sx={{ display: { xs: "flex", sm: "none" } }} open={open} onClick={() => setOpen(false)}>
                    <StyledDrawer>
                        <img className="mobile-logo" src={logo} alt="Menty.AI logo" />

                        <Divider sx={{ marginTop: 2, marginBottom: 2 }} fullWidth orientation="horizontal" textAlign="center"/>

                        <Stack gap={1}>
                            <StyledNavlink component={HashLink} to="/#about">How it works</StyledNavlink>
                            { access && <StyledNavlink component={ReactLink} to="/dashboard">Dashboard</StyledNavlink> }
                        </Stack>

                        <Divider sx={{ marginTop: 2, marginBottom: 2 }} fullWidth orientation="horizontal" textAlign="center"/>

                        {
                            access ?
                            <StyledNavlink onClick={handleLogOut}>Log out</StyledNavlink>
                            :
                            <Stack gap={1}>
                                <StyledNavlink component={ReactLink} to="/login">Log in</StyledNavlink>
                                <StyledNavlink component={ReactLink} to="/register">Sign up</StyledNavlink>
                            </Stack>
                        }
                    </StyledDrawer>
                </Drawer>
            </StyledToolbar>
        </AppBar>
    )
}

export default Header