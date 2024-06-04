import React from 'react'

const Login = () => {
  return (
    <section className='login-wrapper'>
        <h1>Login</h1>
        <form action="">
            <div className="login-input-wrapper">
                <label htmlFor="">username</label>
                <input type="text" />
            </div>
            <div className="login-input-wrapper">
                <label htmlFor="">password</label>
                <input type="password" name="" id="" />
            </div>
            <button>Login</button>
        </form>
    </section>
  )
}

export default Login