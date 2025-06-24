import { useContext } from "react"
import { DashboardContext } from "../../Dashboard"
import { styled, Typography } from "@mui/material"
import { useState } from "react"
import { useEffect } from "react"

const StyledDate = styled(Typography)(({theme})=>({
    color: theme.palette.secondary.tint3,
    textTransform: "cappitalize",
    fontWeight: "bold",
    fontSize: theme.spacing(3),
    marginBottom: theme.spacing(1.5)
}))

const AdviceCard = () => {
    // Gets dashboard data from the context
    const { StyledCard, sentiments } = useContext(DashboardContext)



    // Applies additional styles to the section
    const StyledAdviceCard = styled(StyledCard)(({ theme })=>({
        backgroundColor: theme.palette.primary.tint8,
        color: theme.palette.text.tint3,

        display: "flex",
        flexDirection: "column",

        paddingLeft: "32px",
        paddingRight: "32px",

        [theme.breakpoints.up("md")]: {
            paddingLeft: "156px",
            paddingRight: "156px",
        }
    }))



    // Stores the raw help text from the sentiment
    const [text, setText] = useState('')

    // Gets today's help text
    useEffect(() => {
        if(sentiments && sentiments.length > 0) {
            const currentDate = new Date().toISOString().split('T')[0]

            // const current = sentiments.find(sentiment => sentiment.date.split('T')[0] === currentDate)?.help_text
            const current = sentiments.find(sentiment => sentiment.date.split('T')[0] === "2024-09-29")?.help_text

            setText(current)
        }
    }, [sentiments])



    // Splits the help text into paragraphs with titles and bodies
    const [formatted, setFormatted] = useState([])

    useEffect(() => {
        if(text.length) {
            let paragraphs = text.split('\n')
            paragraphs = paragraphs.map(paragraph => {
                return {
                    type: paragraph[0] === '*' ? 'title' : 'paragraph',
                    text: paragraph
                }
            })
            paragraphs = paragraphs.map(paragraph => {
                if(paragraph.type === 'title') {
                    const newText = paragraph.text.replace(/\*/g, '')
                    return {
                        type: 'title',
                        text: newText
                    }
                }
                else return paragraph
            })

            setFormatted(paragraphs)
        }
    }, [text])



    // Gets the current date
    const date = `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`



    return (
        (formatted && formatted.length > 0) ?
        <StyledAdviceCard>
            <Typography variant="h3" color="primary">Your daily advice from us</Typography>
            <StyledDate variant="body1">{date}</StyledDate>

            {
                formatted.map((paragraph, i) => (
                    paragraph.type === 'title' ?
                    <Typography key={i} variant="h5" color="primary">{paragraph.text}</Typography>
                    :
                    <Typography key={i} mb={1} variant="body1">{paragraph.text}</Typography>
                ))
            }
        </StyledAdviceCard> 
        :
        null
    )
}

export default AdviceCard