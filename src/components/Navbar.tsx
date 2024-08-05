import { NavLink, useNavigate } from 'react-router-dom'
import '../assets/css/component/Navbar.css'
import { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase-config'
import { useContext } from 'react'
import SignupContext from '../context/SignupContext'
const Navbar = (/*{user}:any*/) => {
    const {setSignupMessage} = useContext(SignupContext)
    const navigate = useNavigate()
    const [windowWidth,setWindowWidth] = useState<any>(window.innerWidth)
    const [menuBarOpen,setMenuBarOpen] = useState<boolean>(false)
    const LogoutBtnHandler = async() => {
        await signOut(auth)
        setMenuBarOpen(false)
        setSignupMessage('You are now Logout')
        navigate('/login')
    }
    useEffect(() => {
        const handleWidthResize = () => {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize',handleWidthResize)
        return () => {
            window.removeEventListener('resize',handleWidthResize)
        }
    },[windowWidth])
  return (
    <>
  
    <nav className='app-nav'>
        {/**
          
         
        <NavLink to={user.user? 'games' : ''} className="nav-logo-txt">
                <h1>SMM {parseInt(windowWidth) <= 430 && user.user  ? " ": <span>PLAY</span>}</h1>
                <i className="fa-solid fa-star"></i>
        </NavLink>
        */}
        {/*
        
        {user.user ? 
            <div className='nav-points-menu'>
                <div className="nav-lucky-points npm-div">
                    <i className="fa-regular fa-face-grin-stars"></i>
                    <span className="lucky-points">
                        {user && parseInt(user.userD?.luckyPoints).toLocaleString('en-US')}
                    </span>
                </div>
                <div className="nav-credits npm-div">
                    <div className="nav-credits-wrapper">
                        <i className="fa-solid fa-money-bill"></i>
                        <span>{user && parseInt(user.userD?.credits).toLocaleString('en-US')}</span>
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
                
        </ul>
        <div className="nav-login-reg-btn">
            <NavLink to={'login'}>Login</NavLink>
            <NavLink to={'register'}>Register</NavLink>
        </div>
        <button onClick={() => setMenuBarOpen(true)} className='lw-menu-btn'><i className="fa-solid fa-bars"></i></button>
        </div>
        }
        */}
    </nav>
{/* <NavLink to={'affiliates'}style={({isActive}) => {
                    return {opacity: isActive ? '.6':'1'}
                }} end>AFILLIATES</NavLink> */}
    {menuBarOpen && 
    
    <div  className="menu-nav-helper">
        {/*
        
asd
    <div className="nav-menu-container">
        <button onClick={() => setMenuBarOpen(false)} className="close-menu-c">
        <i className="fa-solid fa-rectangle-xmark"></i>
        </button>
        <div className="menu-header">
            <h1>SMM PLAY</h1>
            <i className="fa-solid fa-star"></i>
        </div>
        {user.user? 
        
        <>
        <div className="menu-n-user-details">
            <div className="mn-user-details">
                <i className="fa-solid fa-user"></i>
                <span>{user?.user?.email}</span>
            </div>
            <div className="mn-user-details">
                <i className="fa-solid fa-hashtag"></i>
                <span>{user?.userD?.phonenumber}</span>
            </div>
        </div>
        <div  className="menu-n-transactions menu-list-div">
            <span>Games</span>
            <NavLink onClick={() => setMenuBarOpen(false)} to={'/games'} className="mnt-transactions">
            <i className="fa-solid fa-house"></i>
                <span>Play Games</span>
            </NavLink>
          
        </div>

        <div  className="menu-n-transactions menu-list-div">
            <span>Lucky Points</span>
            <NavLink onClick={() => setMenuBarOpen(false)} to={'/redeempoints'} className="mnt-transactions">
            <i className="fa-regular fa-face-grin-stars"></i>
                <span>Redeem Lucky Points</span>
            </NavLink>
          
        </div>

        <div  className="menu-n-transactions menu-list-div">
            <span>Transactions</span>
            <NavLink onClick={() => setMenuBarOpen(false)} to={'cashins'} className="mnt-transactions">
                <i className="fa-solid fa-money-bill-transfer"></i>
                <span>Cash-ins</span>
            </NavLink>
            <NavLink onClick={() => setMenuBarOpen(false)} to={'withdrawals'} className="mnt-transactions">
                <i className="fa-solid fa-newspaper"></i>
                <span>Withdrawals</span>
            </NavLink>
        </div>
        <div  className="menu-n-credits menu-list-div">
            <span>Credits</span>
            
            <NavLink onClick={() => setMenuBarOpen(false)} to={'withdraw'} className="mnc-credits">
                <i className="fa-solid fa-building-columns"></i>
                <span>Withdraw</span>
            </NavLink>
        </div>
        <div className="menu-n-account">
            <span>Account</span>
            <NavLink onClick={() => setMenuBarOpen(false)} to={"account"} className="mna-account">
                <i className="fa-solid fa-user-tie"></i>
                <span>Account</span>
            </NavLink>
            <div className="mna-account">
                
                <button onClick={LogoutBtnHandler}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>Log-out</span>
                </button>
            </div>
        </div>
        </> :
        <>
        
            <div className="not-login-menu-links">
                <NavLink onClick={() => setMenuBarOpen(false)} to={'/'} className='nlm-wrapper'>
                    <i className="fa-solid fa-house"></i>
                    <span >Home</span>
                </NavLink>
                <NavLink onClick={() => setMenuBarOpen(false)}   to={'/aboutus'} className='nlm-wrapper'>
                    <i className="fa-solid fa-info"></i>
                    <span>About us</span>
                </NavLink>
            </div>
            <div className="not-login-menu-button">
                <NavLink onClick={() => setMenuBarOpen(false)}  to={'/register'} className='nlm-wrapper'>
                <i className="fa-solid fa-user-plus"></i>
                <span>Register</span>
                </NavLink>
                <NavLink onClick={() => setMenuBarOpen(false)}  to={'/login'} className='nlm-wrapper'>
                <i className="fa-solid fa-right-to-bracket"></i>
                <span >Login</span>
                </NavLink>
            </div>
        </>
    }
    </div>
*/}
{/* <NavLink onClick={() => setMenuBarOpen(false)} to={'deposit'} className="mnc-credits">
                <i className="fa-solid fa-money-bill"></i>
                <span>Deposit</span>
            </NavLink> */}
    </div>
    }
    </>
  )
}

export default Navbar