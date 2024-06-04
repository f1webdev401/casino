import { NavLink } from 'react-router-dom'
import '../assets/css/component/Navbar.css'
const Navbar = () => {
    const isLogin = false
  return (
    <nav className='app-nav'>
        <NavLink to={''} className="nav-logo-txt">
                <h1>SMM PLAY</h1>
                <i className="fa-solid fa-star"></i>
        </NavLink>
        {isLogin ? 
            // <div className='nav-points-menu'>
            //     <div className="nav-lucky-points npm-div">
            //         <i className="fa-regular fa-face-grin-stars"></i>
            //         <span className="lucky-points">
            //             0
            //         </span>
            //     </div>
            //     <div className="nav-credits npm-div">
            //         <div className="nav-credits-wrapper">
            //             <i className="fa-solid fa-money-bill"></i>
            //             <span>100</span>
            //         </div>
            //     <button><i className="fa-solid fa-plus"></i></button>
            //     </div>

            //     <button className='nav-menu-btn'>
            //     <i className="fa-solid fa-bars"></i>
            //     </button>
            // </div>
            ''
        :
        ''
        // <div className="link-wrapper">

        // <ul className="link-list">
        //     <NavLink to={'/'} style={({isActive}) => {
        //         return {opacity: isActive ? '.6':'1'}
        //     }} end>HOME</NavLink>
        //     <NavLink to={'aboutus'} style={({isActive}) => {
        //         return {opacity: isActive ? '.6':'1'}
        //     }} end>ABOUT US</NavLink>
        //         {/* <NavLink to={'affiliates'}style={({isActive}) => {
        //             return {opacity: isActive ? '.6':'1'}
        //         }} end>AFILLIATES</NavLink> */}
        // </ul>
        // <div className="nav-login-reg-btn">
        //     <button>Login</button>
        //     <button>Register</button>
        // </div>
        // </div>
        }
    </nav>
  )
}

export default Navbar