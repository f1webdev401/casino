import '../../assets/css/pages/games/WelcomeMsg.css'
import UserContext from '../../context/UserContext'
import { useContext } from 'react'
import { db } from '../../firebase-config'
import { update,ref } from 'firebase/database'

const WelcomeMsg = () => {
    const {userD,setUserD} = useContext(UserContext)
    if(userD === "loading") {
        return <span></span>;
    }
    if(!userD) {
        return <span></span>;
    }
    const CloseBtnHandler = async () => {
        await update(ref(db,`users/${userD.uid}`),{
            isFirstLogin: false
        })
    }
    if(userD && userD.isFirstLogin) {
        return (
            <section className='welcome-msg-container'>
                <div className="welcome-msg-content">
                    <div className="welcome-msg-header">
                        <h1>Welcome to Smm Play ✨ </h1>
                    </div>
                    <div className="welcome-body-content">
                        <div className="wbc-text">
                            <h2>Roulette:</h2>
                            <p>Bet just 20 PHP and spin for a chance to win up to 10k. Experience the excitement as the wheel spins and lands on your lucky number!</p>
                        </div>
                        <div className="wbc-text">
                            <h2>Ultimate Hunt Prize:</h2>
                            <p>Choose from 25 boxes, with one 500k jackpot prize! Simply select a box, click "Open," and discover your prize. The remaining boxes contain no rewards, so choose wisely!</p>
                            <p>If you find a throphy you hit the jackpot prize otherwise lose.</p>
                        </div>
                        <div className="wbc-note">
                            <p>Every Bet is Credits 20.00 </p>
                        </div>

                        <div className="wbc-text">
                            <h2>Raffle Draw:</h2>
                            <p>For just 500 PHP, you can enter the draw and stand a chance to win a massive cash prize. There are only 3,000 slots available, so act fast. Don’t miss out on this incredible opportunity to test your luck. Buy your ticket now!</p>
                            <p>1 million Prize / 3000 slots</p>
                        </div>
                        <div className="wbc-note">
                            <p>Credits 500.00 Per Slot</p>
                        </div>
                    </div>
                    <div className="welcome-msg-btn">
                        <button onClick={CloseBtnHandler}>Close</button>
                    </div>
                </div>
            </section>
          )
    }

    return (
        <span></span>
    )
 
}

export default WelcomeMsg