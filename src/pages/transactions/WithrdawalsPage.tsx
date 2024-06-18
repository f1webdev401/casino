import '../../assets/css/pages/transactions/WithdrawalsPage.css'
import UserContext from '../../context/UserContext'
import { useContext } from 'react'
import NeedLogin from '../../components/NeedLogin'
const WithrdawalsPage = () => {
  const {userD} = useContext(UserContext)
  console.log(userD)
 
  return (
   <section className="withdrawals-p-container">
    <NeedLogin/>
    <div className="withdrawals-p-body">
      <div className="withdrawals-p-header">
        <h1>Withdrawals History</h1>
      </div>
      <div className="withdrawals-p-data">
      
      {userD !== null && userD !== "loading" && userD?.withdrawals[0] !== "null" ? 
      [...userD?.withdrawals].reverse().map((detail:any,index:number) => (
        <div className="withdrawals-p-details" key={index}>
          <div className="withdrawals-p-stats" style={{backgroundColor:detail.status === "pending" ? "var(--yellow)" : "var(--green)"}}>
            {
              detail.status === "pending" ? 
              <i className="fa-solid fa-clock"></i>
              :
              <i className="fa-solid fa-check-double"></i>
            }
          </div>
          <div className="withdrawals-p-info">
            <div className="withdrawals-p-wallet">
              <span>{detail.type} -</span>
              <span>{detail.number}</span>
            </div>
            <div className="withdrawals-p-date">
              <span>{detail.date}</span>
            </div>
          </div>
          <div className="withdrawals-p-amount">
            <span style={{color: detail.status === "pending" ? "var(--yellow)":"var(--green)"}}>{detail.status}</span>
            <span>- {detail.amount}</span>
          </div>
        </div>
        )) 
      : <div className='withdrawals-p-no-data'>
        <span>No Withrawals History</span>
        <i className="fa-solid fa-hourglass-end"></i>
      </div>
    }
      </div>

      {/* <div className="withdrawals-p-pagination">
        <button className='wpp-prev'>Prev</button>
          <span>1</span>
          <button className='wpp-next'>Next</button>
      </div> */}
    </div>
   </section>
  )
}

export default WithrdawalsPage