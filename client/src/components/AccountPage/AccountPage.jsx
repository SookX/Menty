import { Button, Card, Divider, Stack, styled, TextField, Typography } from "@mui/material"
import Section from "../../components/Section/Section"

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

const AccountPage = ({
    title="Log in to your account",
    inputs=[{
        label: "Email",
        type: "email"
    }],
    button="Log in to my account",
    oauth=[]
}) => {
    return (
        <Section>
            <StyledCard>
                <Typography variant="h4" mb={4} color="primary">{title}</Typography>

                <Stack gap={1.5}>
                    {/* <TextField color="primary" variant="outlined" label="Email" type="email" />
                    <TextField color="primary" variant="outlined" label="Password" type="password" /> */}
                    {
                        inputs.map((input, i) => (
                            <TextField key={i} color="primary" variant="outlined" label={input.label} type={input.type} />
                        ))
                    }

                    <StyledButton variant="contained" color="primary">{button}</StyledButton>

                </Stack>

                {
                    oauth.length > 0 &&
                    <>
                        <Divider sx={{ marginBottom: 3, marginTop: 4 }}> 
                            <Typography variant="body1" textTransform="uppercase">Or</Typography>
                        </Divider>

                        {
                            oauth.map((oauth, i) => (
                                <StyledButton
                                    key={i}
                                    variant="outlined"
                                    color="primary"
                                    startIcon={oauth.icon}
                                >
                                        {oauth.label}
                                </StyledButton>
                            ))
                        }
                    </>
                }
            </StyledCard>
        </Section>
    )
}

export default AccountPage