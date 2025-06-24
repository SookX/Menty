import { Dialog, Paper, styled } from "@mui/material"
import { theme } from "../../../../theme/theme"
import './animations.css'

const Loader = () => {
    const StyledPaper = styled(Paper)(({theme})=>({
        background: "transparent",
        boxShadow: "none"
    }))

    return (
        <Dialog open={true} PaperComponent={StyledPaper}>
            <div className="loader"></div>
        </Dialog>
    )
}

export default Loader