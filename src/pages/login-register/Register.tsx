import { NavLink , useNavigate } from 'react-router-dom'
import '../../assets/css/pages/login-register/Register.css'
import { auth ,db } from '../../firebase-config'
import { createUserWithEmailAndPassword , signOut} from 'firebase/auth'
import { set ,ref } from 'firebase/database'
import { useState } from 'react'
import { useContext } from 'react'
import SignupContext from '../../context/SignupContext'

const Register = () => {
    const navigate = useNavigate()
    const {setSignupMessage} = useContext(SignupContext)
    const [userDetail,setUserDetail] = useState<any>({
        email: '',
        phonenumber: '',
        referralCode:'',
        password: '',
        confirmPassword: ''

    })
    const [passwordShow,setPasswordShow] = useState<any>({
        password1: false,
        password2: false
    })
    const [password1Type,setPassword1Type] = useState('password')
    const [password2Type,setPassword2Type] = useState('password')
    const [isSubmitted,setIsSubmitted] = useState<boolean>(false)

    const showPass1 =() => {
        if(passwordShow.password1) {
            setPasswordShow((prev:any) => ({...prev , password1:false}))
            setPassword1Type('password')
        }else {
            setPasswordShow((prev:any) => ({...prev , password1:true}))
            setPassword1Type('text')
        }
    }
    const showPass2 =() => {
        if(passwordShow.password2) {
            setPasswordShow((prev:any) => ({...prev , password2:false}))
            setPassword2Type('password')
        }else {
            setPasswordShow((prev:any) => ({...prev , password2:true}))
            setPassword2Type('text')
        }
    }
    const [errorInput,setErrorInput] = useState<string>('')
    const RegisterInpuHandler = (e:any) =>{
        const {name,value} = e.target
        setUserDetail((prev:any) => ({...prev,[name]:value}))
    }
    const RegisterBtnHandler = async (e:any) => {
        e.preventDefault()
        setIsSubmitted(true)
        if(!userDetail.email || !userDetail.phonenumber || !userDetail.password || !userDetail.confirmPassword) {
            setErrorInput("Please Input All Fields")
            setIsSubmitted(false)
            return;
        }
        if(userDetail.password !== userDetail.confirmPassword) {
            setErrorInput("Password not match")
            setIsSubmitted(false)
            return
        }   

        try {
            const user = await createUserWithEmailAndPassword(auth ,userDetail.email,userDetail.password)
            await set(ref(db ,`/${user.user.uid}`), {
                phonenumber:userDetail.phonenumber,
                referralCode:userDetail.referralCode,
                credits:0,
                luckyPoints:0,
                ownReferral:user.user.uid,
                email:userDetail.email
            })  
            await signOut(auth)
            setSignupMessage("Succesfully Register You can now Login")
            navigate('/login')
            setIsSubmitted(false)
            console.log(user)
        }catch(e:any) {
            const errorMessage = e.message;
            const errorCode = errorMessage.split(':').pop().trim(); // Extract the last part and remove leading/trailing whitespace
            console.log(errorCode);
            setErrorInput(`(${errorCode.slice(0)}`)
            console.log(e)
            setIsSubmitted(false)
        }
    }
  return (
    <section className='register-container'>
        <div style={{userSelect:isSubmitted?'none':'auto'}} className="register-form-wrapper">
            <h1>Welcome to Registration Page</h1>
            <h2>Create an Account</h2>
            <form onSubmit={(e) => RegisterBtnHandler(e)} action="">
                {errorInput && 
                
                <div className="error-container">
                    <span>{errorInput}</span>
                    <button onClick={() => setErrorInput('')} type='button'><i className="fa-solid fa-xmark"></i></button>
                </div>
                }
                <div className="register-input-wrapper">
                    <label htmlFor="email">Email</label>
                    <input
                    onChange={(e) => RegisterInpuHandler(e)}
                    name='email'
                    type="email" id='email'/>
                </div>
                <div className="register-input-wrapper">
                    <label htmlFor="phonenumber">Phonenumber</label>
                    <input
                    onChange={(e) => RegisterInpuHandler(e)}
                    name='phonenumber'
                    type="text" id='phonenumber'/>
                </div>
                <div className="register-input-wrapper">
                    <label htmlFor="referral">Referral Code</label>
                    <input
                    onChange={(e) => RegisterInpuHandler(e)}
                    name='referralCode' type="text" id='referral' placeholder='optional'/>
                </div>
                <div className="register-input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input
                    onChange={(e) => RegisterInpuHandler(e)}
                    name='password'
                    type={password1Type} id='password'/>
                    {passwordShow.password1 ?
                    <i onClick={showPass1} className="fa-regular fa-eye"></i>
                    :
                    <i onClick={showPass1} className="fa-regular fa-eye-slash"></i>
                }
                </div>
                <div className="register-input-wrapper">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                    onChange={(e) => RegisterInpuHandler(e)}
                    name='confirmPassword'
                    type={password2Type} id="confirm-password" />
                    {passwordShow.password2? 
                        <i onClick={showPass2} className="fa-regular fa-eye"></i>
                        :
                    <i onClick={showPass2} className="fa-regular fa-eye-slash"></i>
                }
                </div>
                <button disabled={isSubmitted} className='register-btn'>{isSubmitted ? "Register on process ...": "Register"}</button>
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