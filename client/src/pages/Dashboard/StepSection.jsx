import { useContext, useEffect, useState } from "react"
import { DashboardContext } from "./Dashboard"

const StepSection = () => {
    const { sentiments } = useContext(DashboardContext)



    // Stores the raw help text from the sentiment
    const [text, setText] = useState('')

    // Gets today's help text
    useEffect(() => {

        const currentDate = new Date().toISOString().split('T')[0]

        const current = sentiments.find(sentiment => sentiment.date.split('T')[0] === currentDate).help_text

        setText(current)
    }, [])



    // Splits the help text into paragraphs with titles and bodies
    const [formatted, setFormatted] = useState([])

    useEffect(() => {
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
    }, [text])



    // Gets the current date
    const date = `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`



    return (
        <section className="full-section steps">
            <h3>Your daily advice from us</h3>
            <p className="advice-date">{date}</p>
            {/* <p className="advice-text">Thanks for sharing your thoughts with us! Based on what you said, Menty.AI came up with some improvement tips just for you.</p>
             */}
            {
                formatted.map(paragraph => (
                    paragraph.type === 'title' ?
                    <h5 className="advice-heading">{paragraph.text}</h5>
                    :
                    <p className="advice-text">{paragraph.text}</p>
                ))
            }
        </section>
    )
}

export default StepSection