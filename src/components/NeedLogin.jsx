import { NavLink } from 'react-router-dom'
import '../assets/css/component/NeedLogin.css'
import UserContext from '../context/UserContext'
import { useContext } from 'react'

const NeedLogin = () => {
    const {userD} = useContext(UserContext)
    if(userD === "loading") {
        return (
            <div className="page-loader-container">
            <span className="loader"></span>
        </div>
        )
    }
    if(!userD) {
        return (
        <>
         <div className='need-login-container'>
            <div className="need-login-wrapper">
                <h1>Need to Login</h1>
                <div className="need-login-btn">
                    <div className="need-login-g">
                    <NavLink to={'/login'}>
                    <span>Go to Login</span>
                    <i className="fa-solid fa-right-to-bracket"></i>
                    </NavLink>
                    
                    </div>
                    <div className="need-login-n-account">
                    <span>don't have an account?</span>
                    <NavLink to={'/register'}>Register</NavLink>
                    </div>
                </div>
            </div>
            </div>
        </>
       
            
        )
    }
    return (
            <span></span>
    )
}

export default NeedLogin