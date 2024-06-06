import { NavLink } from 'react-router-dom'
import '../assets/css/component/Footer.css'
const Footer = () => {
  return (
    <footer className='footer'>
        <div className="footer-body">

        <div className="footer-logo-txt ">
            <div className="footer-text">
                <h1>SMM PLAY</h1>
                <i className="fa-solid fa-star"></i>
            </div>
        </div>

        <div className="footer-social-links link-box f-body-child">
            <h5>FOLLOW US</h5>
            <div className='footer-link-div'>
                <i className="fa-brands fa-facebook-f facebook-i"></i>
                <NavLink to={""}>
                    Facebook
                </NavLink>
            </div>
            <div className='footer-link-div'>
                <i className="fa-brands fa-x-twitter twitter-i"></i>
                <NavLink to={""}>
                    Twitter
                </NavLink>
            </div>
            <div className='footer-link-div'>
                <i className="fa-brands fa-instagram instagram-i"></i>
                <NavLink to={""}>
                    Instagram
                </NavLink>
            </div>
        </div>

        <div className="footer-terms link-box f-body-child">
            <h5>TERMS</h5>
            <div className="footer-link-div">

                <NavLink to={""}>Terms & Conditions</NavLink>
            </div>
            <div className="footer-link-div">

            <NavLink to={""}>
                Betting Rules
            </NavLink>
            </div>
            <div className="footer-link-div">

            <NavLink to={""}>Privacy Policy</NavLink>
            </div>
            <div className="footer-link-div">

            <NavLink to={""}>Responsible Gaming</NavLink>
            </div>
            <div className="footer-link-div">

            <NavLink to={""}>Fairness & RNG Testing Methods</NavLink>
            </div>
        </div>

        <div className="footer-legal link-box f-body-child">
            <h5>LEGAL</h5>
            <div className='footer-link-div'>
            <NavLink to={""}>Anti-Money Laundering</NavLink>
            </div>
            <div className="footer-link-div">

            <NavLink to={""}>Responsible Gaming</NavLink>
            </div>
            <div className="footer-link-div">

            <NavLink to={""}>Self-Exclusion</NavLink>
            </div>
        </div>

        </div>
        <div className="footer-copy-right">

        <p>&copy; 2024 SMM PLAY. All rights reserved</p>
        </div>
    </footer>
  )
}

export default Footer