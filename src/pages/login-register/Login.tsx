import { NavLink ,useNavigate} from 'react-router-dom'
import '../../assets/css/pages/login-register/Login.css'
import { useContext, useState } from 'react'
import SignupContext from '../../context/SignupContext'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase-config'
import axios from 'axios'
import { useCookies } from 'react-cookie'
const Login = () => {
  const [cookies, setCookie, removeCookie] = useCookies<any>(['token'])
  const [userDetail,setUserDetail] = useState<any>(
    {
      email:'',
      password:''
    }
  )
  const [showPass,setShowPass] = useState<boolean>(false)
  const {signupMessage,setSignupMessage} = useContext(SignupContext)
  const [errorMessage,setErrorMessage] = useState<string>('')
  const [isSubmitted,setIsSubmitted] = useState<boolean>(false)
  const navigate = useNavigate()
  const ShowPassBtnHandler = () => {
    if(showPass) {
      setShowPass(false)
    }else {
      setShowPass(true)
    }
  }

  const LoginInputHandler = (e:any) => {
    const {value,name} = e.target

    setUserDetail((prev:any) => ({...prev , [name]:value}))


  }

  const LoginFormSubmit = async (e:any) => {
    e.preventDefault()
    setIsSubmitted(true)
    try {
      // const user = await signInWithEmailAndPassword(auth,userDetail.email,userDetail.password)
      // setIsSubmitted(false)
      // navigate('/games')
      const {data} = await axios.post('https://smmserver.onrender.com/api/users/login',{
        ...userDetail
      },
      {
        withCredentials:true
      }
      );
      const {success,message,token} = data
      if(success) {
        setCookie('token',token)
        setTimeout(() => {
          navigate('/games')
        },1000 )
      }else {
        console.log(message)
      }
      setErrorMessage(message)
      setIsSubmitted(false)
    }
    catch(e:any) {
        // const errorMessage = e.message;
        // const errorCode = errorMessage.split(':').pop().trim();
        // setErrorMessage(errorCode.slice(0))
        setErrorMessage(e)
        console.log(e)
        setIsSubmitted(false)
    }
  }
  return (
    <section className='login-container'>

        <div className="login-c-wrapper">
        <h1>Welcome to Login Page</h1>
        <h2>Login your'e Account</h2>
        <form onSubmit={(e) => LoginFormSubmit(e)} action="">
          {signupMessage && 
          <div className="lc-success-signup">
            <span>{signupMessage}</span>
            <button type='button' onClick={() => setSignupMessage('')}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          }
          {errorMessage &&
          <div className="lc-error-message">
            <span>{errorMessage}</span>
            <button onClick={() => setErrorMessage('')} type='button'><i className="fa-solid fa-xmark"></i></button>
          </div>
          }
            <div className="login-input-wrapper">
                <label htmlFor="email">Email</label>
                <input
                value={userDetail.email}
                onChange={(e) => LoginInputHandler(e)}
                name='email'
                type="email" id="email"/>
            </div>
            <div className="login-input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                onChange={(e) => LoginInputHandler(e)}
                value={userDetail.password}
                type={showPass ? 'text':'password'} name="password" id="password" />
                {
                  showPass ?
                  <i onClick={ShowPassBtnHandler}  className="fa-regular fa-eye"></i>
                   :
                    <i onClick={ShowPassBtnHandler} className="fa-regular fa-eye-slash"></i>
                }
                    
            </div>
            <button disabled={isSubmitted} className='lc-login-button'>{isSubmitted ? 
            'Loggin in ...': 'Login'  
          }</button>
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