import { useEffect, useState } from "react"

const StepSection = () => {
    const text = `
Dear friend, I'm so sorry to hear that you're struggling with Depression right now. Please know that you're not alone, and I'm here to support you every step of the way. Here are some personalized tips to help you manage your emotions and improve your well-being:

**1. Take a Breathing Break**
Stop for a moment, take a few deep breaths in through your nose and out through your mouth. Feel the air fill your lungs, and then release it slowly. This simple act can help calm your mind and slow down your racing thoughts. Try inhaling for a count of four, holding for a count of four, and exhaling for a count of four. Repeat this process a few times.

**2. Get Moving, Even If It's Just a Little**
Exercise can be a powerful mood-booster. I know it might feel like the last thing you want to do when you're feeling down, but trust me, it's worth it. Even a short 5-10 minute walk outside, some light stretching, or a few jumping jacks can help release endorphins, which are natural mood-lifters. Start small, and see how you feel.     

**3. Practice Self-Care with a Soothing Bath**
A warm bath can be incredibly relaxing. Fill your tub with some calming essential oils like lavender or chamomile, and soak for at least 20 minutes. Let your worries melt away, and focus on the sensation of the water supporting your body. You can even add some soft music or a guided meditation to enhance the experience.

**4. Reach Out to a Friend or Family Member**
You don't have to face this alone. Talk to someone you trust about how you're feeling. Sometimes just sharing your emotions with a loved one can help you feel heard and understood. You can also reach out to a hotline or text line for support, such as the National Suicide Prevention Lifeline (1-800-273-TALK) or the Crisis Text Line (text HOME to 741741).

**5. Allow Yourself to Feel Your Emotions**
Try not to suppress your emotions or try to "tough it out." Allow yourself to feel whatever emotions arise, even if it's hard. Acknowledge their presence, and remind yourself that they are valid. Write in a journal, draw, or talk to someone about how you're feeling. By acknowledging your emotions, you can begin to process and heal.    

Remember, my friend, you're not alone in this struggle. You're strong, capable, and deserving of support and compassion.
    `

    // Splits the text into paragraphs with titles and bodies
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
    }, [])



    // Gets the current date
    const date = `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`


    
    return (
        <section className="full-section steps">
            <h3>Your daily advice from us</h3>
            <p className="advice-date">{date}</p>
            
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