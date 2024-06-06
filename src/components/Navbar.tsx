import { NavLink } from 'react-router-dom'
import '../assets/css/component/Navbar.css'
import { useState } from 'react'
const Navbar = () => {
    const isLogin = false
    const [menuBarOpen,setMenuBarOpen] = useState<boolean>(false)
  return (
    <>
  
    <nav className='app-nav'>
        <NavLink to={''} className="nav-logo-txt">
                <h1>SMM <span>PLAY</span></h1>
                <i className="fa-solid fa-star"></i>
        </NavLink>
        {isLogin ? 
            <div className='nav-points-menu'>
                <div className="nav-lucky-points npm-div">
                    <i className="fa-regular fa-face-grin-stars"></i>
                    <span className="lucky-points">
                        100,000
                    </span>
                </div>
                <div className="nav-credits npm-div">
                    <div className="nav-credits-wrapper">
                        <i className="fa-solid fa-money-bill"></i>
                        <span>100,000</span>
                    </div>
                <button><i className="fa-solid fa-plus"></i></button>
                </div>

                <button onClick={() => setMenuBarOpen(true)} className='nav-menu-btn'>
                <i className="fa-solid fa-bars"></i>
                </button>
            </div>
        :
        <div className="link-wrapper">

        <ul className="link-list">
            <NavLink to={'/'} style={({isActive}) => {
                return {opacity: isActive ? '.6':'1'}
            }} end>HOME</NavLink>
            <NavLink to={'aboutus'} style={({isActive}) => {
                return {opacity: isActive ? '.6':'1'}
            }} end>ABOUT US</NavLink>
                {/* <NavLink to={'affiliates'}style={({isActive}) => {
                    return {opacity: isActive ? '.6':'1'}
                }} end>AFILLIATES</NavLink> */}
        </ul>
        <div className="nav-login-reg-btn">
            <NavLink to={'login'}>Login</NavLink>
            <NavLink to={'register'}>Register</NavLink>
        </div>
        <button onClick={() => setMenuBarOpen(true)} className='lw-menu-btn'><i className="fa-solid fa-bars"></i></button>
        </div>
        }
    </nav>

    {menuBarOpen && 
    
    <div className="menu-nav-helper">
    <div className="nav-menu-container">
        <button onClick={() => setMenuBarOpen(false)} className="close-menu-c">
        <i className="fa-solid fa-rectangle-xmark"></i>
        </button>
        <div className="menu-header">
            <h1>SMM PLAY</h1>
            <i className="fa-solid fa-star"></i>
        </div>

        <div className="menu-n-user-details">
            <div className="mn-user-details">
                <i className="fa-solid fa-user"></i>
                <span>holycaow123</span>
            </div>
            <div className="mn-user-details">
                <i className="fa-solid fa-hashtag"></i>
                <span>09515401694</span>
            </div>
        </div>

        <div  className="menu-n-transactions menu-list-div">
            <span>Transactions</span>
            <NavLink to={''} className="mnt-transactions">
                <i className="fa-solid fa-money-bill-transfer"></i>
                <span>Cash-ins</span>
            </NavLink>
            <NavLink to={''} className="mnt-transactions">
                <i className="fa-solid fa-newspaper"></i>
                <span>Withdrawals</span>
            </NavLink>
        </div>
        <div  className="menu-n-credits menu-list-div">
            <span>Credits</span>
            <NavLink to={''} className="mnc-credits">
                <i className="fa-solid fa-money-bill"></i>
                <span>Deposit</span>
            </NavLink>
            <NavLink to={''} className="mnc-credits">
                <i className="fa-solid fa-building-columns"></i>
                <span>Withdraw</span>
            </NavLink>
        </div>
        <div className="menu-n-account">
            <span>Account</span>
            <NavLink to={""} className="mna-account">
                <i className="fa-solid fa-user-tie"></i>
                <span>Account</span>
            </NavLink>
            <div className="mna-account">
                
                <button>
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>Log-out</span>
                </button>
            </div>
        </div>
    </div>

    </div>
    }
    </>
  )
}

export default Navbar