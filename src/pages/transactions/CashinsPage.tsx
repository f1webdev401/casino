import '../../assets/css/pages/transactions/CashinsPage.css'
import UserContext from '../../context/UserContext'
import { useContext } from 'react'
import NeedLogin from '../../components/NeedLogin'
const CashinsPage = () => {
    const {userD} = useContext(UserContext)
  
  return (
    <section className='cashins-p-container'>
        <NeedLogin/>
        <div className="cashin-p-body">
            <div className="cashin-p-header">
                <h1>Cash-ins History</h1>
            </div>
            <div className="cashin-p-data-wrapper">
            {/* */}
            {userD && userD !== "loading" && userD?.cashins[0] !== "null" ?  
                [...userD?.cashins].reverse().map((detail:any,index:number) => (
                    <div className="cashin-p-data" key={index}>
                    <div className="cashin-p-stat">
                        <i className="fa-solid fa-check"></i>
                    </div>
                    <div className="cashin-p-details">
                        <div className="cashin-p-type">
                            <span>{detail.type}</span>
                        </div>
                        <div className="cashin-p-date">
                            <span>{detail.date}</span>
                        </div>
                    </div>
                    <div className="cashin-p-amount">
                        <span>+ {detail.amount}</span>
                    </div>
                </div>
                ))
                :
                <div className='cashin-p-no-data'>
                    <span>
                        No Cashin History
                    </span>
                    <i className="fa-solid fa-hourglass-end"></i>
                </div>
        }
            </div>

            {/* <div className="cpbody-paginator">
                <button>Prev</button>
                <span>1</span>
                <button className='cpbodyp-next'>Next</button>
            </div> */}
        </div>
    </section>
  )
}

export default CashinsPage