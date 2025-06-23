import { Button, Card, Divider, Stack, styled, TextField, Typography } from "@mui/material"
import Section from "../../components/Section/Section"
import { Google } from "@mui/icons-material"

const StyledCard = styled(Card)(({theme})=>({
    textAlign: "center",
    
    width: "80%",
    [theme.breakpoints.up("sm")]: { width: "70%" },
    [theme.breakpoints.up("md")]: { width: "60%" },
    [theme.breakpoints.up("lg")]: { width: "40%" },
    
    margin: "0 auto",
    padding: "48px",
    marginTop: "128px"
}))

const StyledButton = styled(Button)({
    width: "100%"
})

const Login = () => {
    return (
        <Section>
            <StyledCard>
                <Typography variant="h4" mb={4} color="primary">Log in to your account</Typography>

                <Stack gap={1.5} mb={4}>
                    <TextField variant="outlined" label="Email" />
                    <TextField color="primary" variant="outlined" label="Password" type="password" />

                    <StyledButton variant="contained" color="primary">Log in to my account</StyledButton>

                </Stack>

                <Divider sx={{ marginBottom: 3 }}> 
                    <Typography variant="body1" textTransform="uppercase">Or</Typography>
                </Divider>

                <StyledButton variant="outlined" color="primary" startIcon={<Google />}>Log in with google</StyledButton>
            </StyledCard>
        </Section>
    )
}

export default Login