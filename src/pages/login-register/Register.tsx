import React from 'react'

const Register = () => {
  return (
    <section className='register-container'>
        <h1>Register</h1>
        <form action="">
            <div className="register-input-wrapper">
                <label htmlFor="">Username</label>
                <input type="text" />
            </div>
            <div className="register-input-wrapper">
                <label htmlFor="">Phonenumber</label>
                <input type="text" />
            </div>
            <div className="register-input-wrapper">
                <label htmlFor="">Password</label>
                <input type="password" />
            </div>
            <div className="register-input-wrapper">
                <label htmlFor="">Confirm Password</label>
                <input type="password" name="" id="" />
            </div>
            <button>Register</button>
        </form>
    </section>
  )
}

export default Register