import '../../assets/css/pages/transactions/WithdrawalsPage.css'
const WithrdawalsPage = () => {
  const data = [
    {
        type:'Gcash',
        number: '09239485701',
        date:'May 16 2024',
        amount: 200.00
    },
    {
        type:'Gcash',
        number: '09239485701',
        date:'May 16 2024',
        amount: 200.00
    },
    {
        type:'Gcash',
        number: '09239485701',
        date:'May 16 2024',
        amount: 200.00
    },
    {
        type:'Gcash',
        number: '09239485701',
        date:'May 16 2024',
        amount: 200.00
    },
    {
        type:'Gcash',
        number: '09239485701',
        date:'May 16 2024',
        amount: 200.00
    },
    {
        type:'Gcash',
        number: '09239485701',
        date:'May 16 2024',
        amount: 200.00
    }
]
  return (
   <section className="withdrawals-p-container">
    <div className="withdrawals-p-body">
      <div className="withdrawals-p-header">
        <h1>Withdrawals History</h1>
      </div>
      <div className="withdrawals-p-data">
        {data.map((detail:any,index:number) => (
        <div className="withdrawals-p-details" key={index}>
          <div className="withdrawals-p-stats">
            <i className="fa-solid fa-check-double"></i>
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
            <span>- {detail.amount}</span>
          </div>
        </div>

        )) }

      </div>

      <div className="withdrawals-p-pagination">
        <button className='wpp-prev'>Prev</button>
          <span>1</span>
          <button className='wpp-next'>Next</button>
      </div>
    </div>
   </section>
  )
}

export default WithrdawalsPage