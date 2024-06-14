import '../../assets/css/pages/games/Games.css'
import { NavLink } from 'react-router-dom'
import RouleteImg from '../../assets/images/roulette-game.png'
import NeedLogin from '../../components/NeedLogin'

const Games = () => {
  return (
    <section className='games-container'>
        <NeedLogin />
        <div className="games-p-wrapper">
            <h1>Grand Opening Event <span>Ends in July 15</span></h1>
            <div className="games-p-event">
                <div className="games-pe-header">
                <span>Games Event</span>
                </div>
                <div className="games-event-list">
                <NavLink to={'/roulettegame'}>
                    <span>500k Jackpot Price</span>
                    <div className="game-e-image">
                        <img src={RouleteImg} alt="" />
                    </div>
                    <span>Roulette Game</span>
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