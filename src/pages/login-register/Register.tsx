import { NavLink } from 'react-router-dom'
import '../../assets/css/pages/login-register/Register.css'
const Register = () => {
  return (
    <section className='register-container'>
        <div className="register-form-wrapper">
            <h1>Welcome to Registration Page</h1>
            <h2>Create an Account</h2>
            <form action="">
                <div className="register-input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input type="text" id='username'/>
                </div>
                <div className="register-input-wrapper">
                    <label htmlFor="phonenumber">Phonenumber</label>
                    <input type="text" id='phonenumber'/>
                </div>
                <div className="register-input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password'/>
                </div>
                <div className="register-input-wrapper">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" name="" id="confirm-password" />
                </div>
                <button>Register</button>
                <div className="reg-al-account">
                    <span>Already have an Account?</span>
                    <NavLink to={'/login'}>Login</NavLink>
                </div>
            </form>

        </div>
    </section>
  )
}

export default Register