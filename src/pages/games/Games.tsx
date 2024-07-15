import '../../assets/css/pages/games/Games.css'
import { NavLink } from 'react-router-dom'
import RouleteImg from '../../assets/images/roulette-game.png'
import UhuntImg from '../../assets/images/u-hunt.png'
import NeedLogin from '../../components/NeedLogin'
import WelcomeMsg from './WelcomeMsg'
import RaffleImg from '../../assets/images/raffle-img.png'
import KenoImg from '../../assets/images/keno-img.png'
import Maintenance from '../../components/maintenance/Maintenance'
const Games = () => {
  return (
    <section className='games-container'>
        <Maintenance/>
        <NeedLogin />
        <WelcomeMsg/>
        <div className="games-p-wrapper">
            <h1>Grand Opening Event <span>Ends in July 15</span></h1>
            <div className="games-p-event">
                <div className="games-pe-header">
                <span>Games Event</span>
                </div>
                <div className="games-event-list">
                <NavLink to={'/roulettegame'}>
                    <span>10k Jackpot Prize</span>
                    <div className="game-e-image">
                        <img src={RouleteImg} alt="" />
                    </div>
                    <span>Roulette Game</span>
                    <p>Play Now</p>
                </NavLink>
                <NavLink to={'/ultimateprizehunt'}>
                    <span>500k Jackpot Prize</span>
                    <div className="game-e-image">
                        <img src={UhuntImg} alt="" />
                    </div>
                    <span>Ultimate Prize Hunt </span>
                    <p>Play Now</p>
                </NavLink>
                </div>
            </div>

            <div className="smm-games-container games-p-event">
                    <div className="smm-games-header games-pe-header">
                        <span>Smm Games</span>
                    </div>
                <div className="smm-games-list games-event-list">
                    <NavLink to={'/keno'}>
                        <span>Win Up to 1 million</span>
                        <div className="smm-g-image game-e-image">
                            <img src={KenoImg} alt="" />
                        </div>
                        <span>Keno Game</span>
                        <p>Play now</p>
                    </NavLink>
                </div>
            </div>

            <div className="games-p-event">
                <div className="games-pe-header">
                <span>Raffle</span>
                </div>
                <div className="games-event-list">
                <NavLink to={'/raffledraw'}>
                    <span>1 Million Prize</span>
                    <div className="game-e-image">
                        <img src={RaffleImg} alt="" />
                    </div>
                    <span>Raffle Draw</span>
                    <p>Play Now</p>
                </NavLink>
                </div>
            </div>

            {/* <div className="smmplay-g-list-container">
                <div className="smmplay-g-list-header">
                    <h1>Games</h1>
                </div>
                <div className="smmplay-games-container">
                    <NavLink to={'/ultimateprizehunt'} className="smmplay-game-box">
                        Ultimate Prize Hunt
                    </NavLink>
                </div>
            </div> */}

            <div className="games-comming-soon">
                <span>Many More Comming Soon!</span>
            </div>
        </div>
    </section>
  )
}

export default Games