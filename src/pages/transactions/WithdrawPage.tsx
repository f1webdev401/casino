import '../../assets/css/pages/transactions/WithdrawPage.css'
import UserContext from '../../context/UserContext'
import { useContext ,useState} from 'react'
import { db } from '../../firebase-config'
import { update ,ref} from 'firebase/database'
import NeedLogin from '../../components/NeedLogin'
const WithdrawPage = () => {
  const {userD,setUserD} = useContext(UserContext)
  const [withdrawDetails,setWithdrawDetails] = useState<any>({
    number:'',
    amount:'',
  })
  const [errorMessage,setErrorMessage] = useState("")
  const [isSubmitWithdraw,setIsSubmitWithdraw] = useState<boolean>(false)
  const [withdrawSuccess,setWithdrawSuccess] = useState<any>(false)
  const WithdrawInpHandler = (e:any) => {
    const {value,name} = e.target
    setWithdrawDetails((prev:any) => ({...prev, [name]:value}))
  }
  const [isSubmitted,setIsSubmitted] = useState<any>(false)
  const WithdrawSubmitHandler = async (e:any) => {
    e.preventDefault()
    let numberRegex = /^\d+$/
    if(userD?.credits < parseInt(withdrawDetails.amount) ) {
      setErrorMessage("Not Enough Credits")
      return;
    }
    if(parseInt(withdrawDetails.amount) < 500) {
      setErrorMessage("Minimun Cashout is 500")
      return;
    }
    if(parseInt(userD?.credits) < 500) {
      setErrorMessage("Minimun Cashout is 500")
      return;
    }
    if(!withdrawDetails.number || !withdrawDetails.amount) {
      console.log("please enter amount")
      setErrorMessage("Please fill all Fields")
      return;
    }
    if(!numberRegex.test(withdrawDetails.amount)) {
      console.log('error amount')
      setErrorMessage("Please Enter Valid Amount")
      return;
    } 
    if(!numberRegex.test(withdrawDetails.number)) {
        console.log('error number')
        setErrorMessage("Please Enter Valid Number")
        return;
    }     
    setIsSubmitWithdraw(true)
    setIsSubmitted(true)
  }
  function getDate() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date()
    return `${months[date.getMonth()]}/${date.getDate()}/${date.getFullYear()}`
  }

  const ConfirmSubmitWithdrawal = async () => {
    if(userD) {
      try {
        console.log(userD.credits)
        if(parseInt(userD?.credits) > 500) {
          await update(ref(db,`users/${userD?.uid}`) ,{
              withdrawals: userD?.withdrawals[0] === "null" ? 
              [{
                  amount:withdrawDetails.amount,
                  date:getDate(),
                  number:withdrawDetails.number,
                  type:"Gcash",
                  status:"pending"}]
              :
                [ ...userD?.withdrawals,
                  {
                    amount:withdrawDetails.amount,
                    date:getDate(),
                    number:withdrawDetails.number,
                    type:"Gcash",
                    status:"pending"}],
              credits:parseInt(userD?.credits) - parseInt(withdrawDetails.amount)
          })
          setUserD((prev:any) => ({...prev,credits:parseInt(userD?.credits) - parseInt(withdrawDetails.amount)}))
          
          setWithdrawSuccess(true)
          setIsSubmitted(false)
          }
      }
      catch(e) {
          setIsSubmitWithdraw(false)
          setIsSubmitted(false)
      }

    }
  }
  const CloseSuccessWithdrawBtn = () => {
    setIsSubmitWithdraw(false)
    setWithdrawSuccess(false)
    setWithdrawDetails({
        number:'',
        amount:'',
    })
  }
  return (
    <section className='withdraw-p-container'>
      <NeedLogin/>
      <div className="withdraw-p-body">
          <div className="withdraw-p-header">
            <h1>Withdraw Credits</h1>
          </div>
          {errorMessage && 
       <div className="withdraw-error-message">
       <span>{errorMessage}</span>
       <button onClick={() => setErrorMessage("")}><i className="fa-solid fa-xmark"></i></button>
       </div>
        }
        {withdrawSuccess && 
        <div className="withdraw-succes-container">
        <div className="withdraw-success">
          <span>You Successfully Requested to Withdraw</span>
          <span> PHP <span className='ws-amount'>{parseInt(withdrawDetails.amount).toLocaleString('en-US')}.00</span></span>
          <button onClick={CloseSuccessWithdrawBtn}>Close</button>
        </div>
        </div>
        }
        {
          isSubmitted && 
        <div className="withdraw-sure-container">
        <div className="withdraw-sure">
          <span>Are you sure you want to</span>
          <span>Withdraw PHP <span className='w-sure-amount'>{parseInt(withdrawDetails.amount).toLocaleString('en-US')}.00</span></span>
          <div className="withdraw-sure-btn">
            <button onClick={ConfirmSubmitWithdrawal}>Yes</button>
            <button onClick={() => {
              setIsSubmitted(false)
              setIsSubmitWithdraw(false)
            }}>No</button>
          </div>
        </div>

        </div>
        }
          <div className="withdraw-p-wallet-outlet">
              <span className='wpwo-header'>Available E-Wallet</span>
            <div className="withdraw-wallet">
              <span>Gcash</span>
            </div>
          </div>
          <form onSubmit={(e) => WithdrawSubmitHandler(e)} action="" className='withdraw-form'>
              <div className="withdraw-input-wrapper">
                <label htmlFor="number">Gcash Number:</label>
                <input
                onChange={(e) => WithdrawInpHandler(e)}
                value={withdrawDetails.number}
                name='number'
                id='number'
                type="text" />
              </div>
              <div className="withdraw-input-wrapper">
                <label htmlFor="amount">Amount to Withdraw:</label>
                <input
                onChange={(e) => WithdrawInpHandler(e)}
                name='amount'
                value={withdrawDetails.amount}
                id='amount'
                type="text" />
              </div>
              <button disabled={isSubmitWithdraw}>{isSubmitWithdraw ? "Submitting Withdrawal ...": "Submit"}</button>
          </form>
          <div className="withdraw-info">
            <p>Minimum Withdrawal - PHP 500</p>
            <p>Withdrawal Takes 5 - 30 minutes</p>
          </div>
      </div>
    </section>
  )
}

export default WithdrawPage