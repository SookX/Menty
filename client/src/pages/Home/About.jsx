import about from '../../img/about.png'

const About = () => {
    const reasons = [
        {
            title: "Personalized",
            content: "Your mental health is unique, and the support you receive should be too. Menty.AI focuses on providing personalized mental wellness recommendations, and self-care strategies."
        },
        {
            title: "Automated",
            content: "You shouldn't have to search for tools or techniques to take care of your mental health. Menty.AI automates this process, making it simple and seamless for you to focus on what matters most—your well-being."
        },
        {
            title: "Steps",
            content: "Leveraging the power of AI, Menty.AI offers insights based on your emotional patterns, helping you develop a deeper understanding of your mental health while suggesting actionable steps for improvement."
        }
    ]

    return (
        <section className="full-section about" id='about'>
            <div className="about-text-box">
                <h2>How it works</h2>
                
                <p>There are many mental health apps available, but none of them quite fit the level of personalized care and insights that users truly need. That's why Menty.AI was created—to offer an enhanced, AI-driven solution for mental wellness that feels tailored to each individual. Here's why:
                </p>

                <div className="about-card-box">
                    {
                        reasons.map((reason, i) => (
                            <AboutCard title={reason.title} content={reason.content} i={i} />
                        ))
                    }
                </div>

                <p>
                Of course, no one solution works for everyone. That's why Menty.AI continues to evolve. We're open to feedback and ideas from users like you, helping us make this assistant even more helpful. Feel free to suggest changes by contributing to this project or submitting feedback. Thanks to everyone who has supported the development of Menty.AI so far!
                </p>
            </div>

            <img src={about} alt="You're not alone" />


        </section>
    )
}


const AboutCard = ({ title, content, i }) => {
    return (
        <div className={`about-card ${i % 2 == 0 ? 'purple' : 'yellow'}`}>
            <h5 className='about-card-heading'>{title}</h5>
            <p className='about-card-text'>{content}</p>
        </div>
    )
}


export default About