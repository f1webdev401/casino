import { NavLink } from 'react-router-dom'
import '../../assets/css/pages/login-register/Login.css'
const Login = () => {
  return (
    <section className='login-container'>

        <div className="login-c-wrapper">
        <h1>Welcome to Login Page</h1>
        <h2>Login your'e Account</h2>
        <form action="">
            <div className="login-input-wrapper">
                <label htmlFor="username">Username</label>
                <input type="text" id="username"/>
            </div>
            <div className="login-input-wrapper">
                <label htmlFor="password">Password</label>
                <input type="password" name="" id="password" />
            </div>
            <button>Login</button>
            <div className="login-d-account">
              <span>Don't have an account?</span>
              <NavLink to={'/register'}>Register</NavLink>
            </div>
        </form>

        </div>
    </section>
  )
}

export default Login