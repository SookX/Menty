import hero from '../../img/hero.png'

const Hero = () => {
    return (
        <section className="full-section hero">
            <img src={hero} alt="Woman Meditating" />

            <h1 className="hero-heading">You're not alone!</h1>

            <p className="hero-text">We are here to help you! Use our tool to track your mental health and get daily advice to improve your life.
            Tell us how you are feeling today - your mood, your activities and our AI will analyze your state and track your mental health every day.</p>

            <textarea 
                placeholder='Tell us how you’re feeling...'
            />

            <button className="btn">Analyze my mental health</button>
        </section>
    )
}

export default Hero