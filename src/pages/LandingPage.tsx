import { NavLink } from 'react-router-dom'
import '../assets/css/pages/LandingPage.css'
import HeadlineImg from '../assets/images/headline-img.png'
import PlatformImg from '../assets/images/platform-bg.png'
const LandingPage = () => {
  return (
    <section className='landing-page-container'>
        <div className="lp-main-headline-container">

            <div className="lp-headline">
                <div className="lp-headline-main-text">
                    <h1>Play now</h1>
                    <h1>for a chance to win a massive</h1>
                    <h1><span className='lp-main-text-price'>500k jackpot prize</span> in our </h1>
                    <h1>grand opening event!</h1>
                </div>
                <p>Win Big Jackpot Today.</p>
                <div className="lp-headline-btn">
                    <NavLink to={'games'}>Play now!</NavLink>
                    <NavLink to={'register'}>Register</NavLink>
                </div>
            </div>
            <div className="lp-headline-image-container">
                    <h1 className='lp-headline-img-text'>Register now for your chance to win the jackpot</h1>
                <div  className="lp-headline-img-wrapper">
                    <img src={HeadlineImg} alt="" />
                </div>
            </div>
        </div>

        <div className="lp-instruct-play">
            <div className="lp-i-sign-up-first lpip-box">
                <div className="lp-i-suf-icon lpip-box-icon">
                <i className="fa-solid fa-user-plus"></i>
                </div>
                <div className="lp-i-suf-text lpip-txt">
                    <span>Sign Up First & Login</span>
                </div>
            </div>
            <div className="lp-i-complete-payment lpip-box">
                    <div className="lp-i-cp-icon lpip-box-icon">
                    <i className="fa-solid fa-money-check"></i>
                    </div>
                    <div className="lp-i-cp-text lpip-txt">
                        <span>Contact Us For Cashin</span>
                        <br />
                        <a style={{fontFamily:"Poppins"}} href='https://www.facebook.com/profile.php?id=61561124611644'>Facebook</a>
                    </div>
            </div>
            <div className="lp-i-play-wind-jackpot lpip-box">
                <div className="lp-pwj-icon lpip-box-icon">
                <i className="fa-solid fa-dice"></i>
                </div>
                <div className="lp-pwj-text lpip-txt">
                    <span>Play & Win the jackpot Prize</span>
                </div>
            </div>
        </div>

        <div className="lp-banner">
            <div className="lp-banner-text">
            <h1>TOP UP 200 PHP GET FREE 100 CREDITS</h1>
            <NavLink to={'register'}>Get Started</NavLink>
            </div>
       
        </div>


        <div className="lp-platform">
            <h1>Platform</h1>
            <div className="lp-platform-content">
                <div className="lp-platform-img">
                    <img src={PlatformImg} alt="" />
                </div>
                <div className="lp-platform-article">
                    <div className="lppa-box">
                        <div className="llpa-box-header">
                        <i className="fa-solid fa-money-bill-transfer"></i>
                        <h4>Fast Deposit</h4>
                        </div>
                        <span>Experience seamless transactions with our platform's fast deposit feature—quick, secure, and hassle-free. Join now!</span>
                    </div>
                    <div className="lppa-box">
                        <div className="llpa-box-header">
                        <i className="fa-solid fa-shield-halved"></i>
                        <h4>Safe & Secure</h4>
                        </div>
                        <span>Our platform ensures your peace of mind with top-notch security measures, keeping your data and funds safe.</span>
                    </div>
                    <div className="lppa-box">
                        <div className="llpa-box-header">
                        <i className="fa-solid fa-money-check"></i>
                        <h4>Quick Cashout</h4>
                        </div>
                        <span>Enjoy swift withdrawals with our fast cashout feature, ensuring you get your winnings quickly and effortlessly.</span>
                    </div>
                    <div className="lppa-box">
                        <div className="llpa-box-header">
                        <i className="fa-solid fa-scale-balanced"></i>
                        <h4>Fair Game</h4>
                        </div>
                        <span>Play with confidence on our platform, where fairness is guaranteed through transparent and unbiased gaming practices.</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default LandingPage