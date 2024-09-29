import { useContext } from "react"
import { DashboardContext } from "./Dashboard"
import LineChart from "./LineChart"
import dashboard from '../../img/dashboard.png'
import { DataContext } from "../../context/DataContext"
import Input from "../../components/Input/Input"

const ChartSection = () => {
    const { loadingSentiment, score, user, handleSubmitSentiment, disabled, remainingString } = useContext(DashboardContext)
    const { prompt, setPrompt } = useContext(DataContext)

    return (
        <section className="full-section dashboard">
            {
                loadingSentiment &&
                <div className="loader"></div>
            }
            <div className="dashboard-left">
                <div className="dashboard-textbox">
                    <h3 className='dashboard-title'>{user.username}</h3>
                    <p className='dashboard-email'>{user.email}</p>
                    <p className='dashboard-text'>Welcome to your dashboard! Here you can find your mental health progress as well as your daily tips for improvement. The chart below shows your mental state over the last 30 days.</p>
                </div>

                <LineChart data={score} />
            </div >

            <div className="dashboard-right">
                <img src={dashboard} alt="Woman thinking" className='dashboard-img' />

                <div className="dashboard-labelbox">
                    {
                        disabled ?
                        <p>You can write again in {remainingString}</p>
                        :
                        <>
                            <h5 className="labelbox-title">How are you feeling today?</h5>
                            <p>Tell us about your day. How are you feeling?</p>
                        </>
                    }
                </div>

                <Input
                    value={prompt}
                    setValue={setPrompt}
                    type="textarea"
                />

                <button className="btn yellow" onClick={handleSubmitSentiment} disabled={disabled ? true : false}>Submit</button>
            </div>

        </section >
    )
}

export default ChartSection