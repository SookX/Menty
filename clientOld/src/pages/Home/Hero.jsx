import { useContext, useState } from 'react'
import Modal from '../../components/Modal/Modal'
import hero from '../../img/hero1.png'
import { DataContext } from '../../context/DataContext'

const Hero = () => {
    // Gets global data from the context
    const { navigate, prompt, setPrompt } = useContext(DataContext)



    // Checks if the user has clicked analyze
    const [modal, setModal] = useState(false)



    // Checks if the user is logged in or not and sends them to the dashboard if they are
    const handleAiRequest = () => {
        if (localStorage.getItem('access')) navigate('/dashboard')
        else setModal(true)
    }



    return (
        <section className="full-section hero">
            <Modal
                shown={modal}
                closeFunc={() => setModal(false)}
            >
                <h5 className='hero-modal-title'>Do you want to start tracking your mental health?</h5>

                <p className='hero-modal-text'>Make an account on our website to start tracking your mental health and get daily tips to improve your wellbeing.</p>

                <div className="hero-modal-btn-box">
                    <button onClick={() => setModal(false)} className="btn btn-secondary">Cancel</button>
                    <button className="btn purple" onClick={() => navigate('/register')}>Sign up</button>
                </div>
            </Modal>


            <img src={hero} alt="Woman Meditating" />

            <h1 className="hero-heading">You're not alone!</h1>

            <p className="hero-text">We are here to help you! Use our tool to track your mental health and get daily advice to improve your life.
                Tell us how you are feeling today - your mood, your activities and our AI will analyze your state and track your mental health every day.</p>

            <textarea
                placeholder='Tell us how you’re feeling...'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />

            <button className="btn yellow" onClick={handleAiRequest}>Analyze my mental health</button>
        </section>
    )
}

export default Hero