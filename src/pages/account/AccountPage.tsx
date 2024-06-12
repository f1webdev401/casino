import { NavLink } from 'react-router-dom'
import '../../assets/css/pages/account/AccountPage.css'
import { useContext } from 'react'
import UserContext from '../../context/UserContext'

const AccountPage = () => {
    const {userD} = useContext(UserContext)
  return (
    <section className='account-p-container'>
        <div className="account-p-body">
            <div className="account-p-header">
                <h1>Account</h1>
            </div>
            <div className="account-p-details">
                <div className="account-p-username apd-box">
                    <span>Email:</span>
                    <span>{userD?.email}</span>
                </div>
                {/* <div className="account-p-username apd-box">
                    <span>Display Name:</span>
                    <span>holycaow123</span>
                </div> */}
                <div className="account-p-number apd-box">
                    <span>Phonenumber:</span>
                    <span>{userD?.phonenumber}</span>
                </div>
                <button>Change Password</button>
            </div>


            <div className="account-p-referral">
                <div className="account-p-r-header">
                    <span>Referal Code</span>
                </div>
                <div className="account-pr-code">
                <span>{userD?.ownReferral}</span>
                <button>
                    <span>Copy Link</span>
                    <i className="fa-solid fa-copy"></i></button>
                </div>
                <p>
                    <i className="fa-solid fa-flag"></i>
                    <span>
                    Share your referral code with a friend. When they sign up, enter the referral code during registration, and deposit 200 credits, you’ll receive 200 credits for free!
                    </span>
                   </p>
            </div>
        </div>
    </section>
  )
}

export default AccountPage