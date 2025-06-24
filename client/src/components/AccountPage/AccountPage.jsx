import { Button, Card, Divider, FormControl, FormHelperText, Stack, styled, TextField, Typography } from "@mui/material"
import Section from "../../components/Section/Section"

const StyledCard = styled(Card)(({theme})=>({
    textAlign: "center",
    
    width: "80%",
    [theme.breakpoints.up("sm")]: { 
        width: "70%",
        padding: "48px"
    },
    [theme.breakpoints.up("md")]: { width: "60%" },
    [theme.breakpoints.up("lg")]: { width: "40%" },
    
    margin: "0 auto",
    padding: "24px",
    marginTop: "128px"
}))

const StyledButton = styled(Button)({
    width: "100%"
})

const AccountPage = ({
    title="Log in to your account",
    errorMsg=null,
    inputs=[{
        label: "Email",
        type: "email",
        value: null,
        setValue: () => {}
    }],
    button="Log in to my account",
    oauth=[],
    handleSubmit = async (e) => {}
}) => {
    return (
        <Section>
            <StyledCard>
                <Typography variant="h4" color="primary">{title}</Typography>

                {
                    errorMsg &&
                    <FormHelperText 
                        sx={{ 
                            textAlign: "center",
                            fontSize: "16px",
                            fontStyle: "italic", 
                            fontWeight: "bold" 
                        }} 
                        error
                    >
                        {errorMsg}
                    </FormHelperText>
                }
                <FormControl fullWidth>

                    <Stack gap={1.5} mt={4}>
                        {/* <TextField color="primary" variant="outlined" label="Email" type="email" />
                        <TextField color="primary" variant="outlined" label="Password" type="password" /> */}
                        {
                            inputs.map((input, i) => (
                                <TextField
                                    key={i}
                                    color="primary"
                                    variant="outlined"
                                    label={input.label}
                                    type={input.type} 
                                    value={input.value}
                                    onChange={(e) => input.setValue(e.target.value)}
                                />
                            ))
                        }

                        <StyledButton
                            type="submit"
                            variant="contained"
                            color="primary" 
                            onClick={(e) => handleSubmit(e)}
                        >
                            {button}
                        </StyledButton>
                    </Stack>

                </FormControl>

                {
                    oauth.length > 0 &&
                    <>
                        <Divider sx={{ marginBottom: 3, marginTop: 4 }}> 
                            <Typography variant="body1" textTransform="uppercase">Or</Typography>
                        </Divider>

                        {
                            oauth.map((oauth, i) => (
                                oauth.component
                                // <StyledButton
                                //     key={i}
                                //     variant="outlined"
                                //     color="primary"
                                //     startIcon={oauth.icon}
                                //     onClick={oauth.onClick}
                                // >
                                //         {oauth.label}
                                // </StyledButton>
                            ))
                        }
                    </>
                }
            </StyledCard>
        </Section>
    )
}

export default AccountPage