import { Box, Button, Card, Dialog, Stack, styled, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import dashboard from '../../../../../../img/dashboard.webp'

const StyledCard = styled(Card)(({theme})=>({
    textAlign: "center",
    padding: theme.spacing(4),
    
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(4),

    overflow: "auto"
}))

const PopUp = ({ open, onClose }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <StyledCard textAlign="center">
                <Box>
                    <img className="dashboard-img" src={dashboard} alt="girl" />
                    <Box>
                        <Typography mb={1} color="primary" variant="h5">Do you want to start tracking your mental health?</Typography>
                        <Typography variant="body1">Make an account on our website to start tracking your mental health and get daily tips to improve your wellbeing.</Typography>
                    </Box>
                </Box>

                <Stack width={"100%"} direction="row" gap={1.5}>
                    <Button onClick={onClose} fullWidth variant="outlined" color="primary">Cancel</Button>
                    <Button fullWidth component={Link} to="/register" variant="contained" color="primary">Sign up</Button>
                </Stack>
            </StyledCard>
        </Dialog>
    )
}

export default PopUp