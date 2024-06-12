import '../../assets/css/pages/transactions/CashinsPage.css'

const CashinsPage = () => {
    const data = [
        {
            type:'Gcash',
            date:'May 16 2024',
            amount: 200.00
        },
        {
            type:'Gcash',
            date:'May 16 2024',
            amount: 200.00
        },
        {
            type:'Gcash',
            date:'May 16 2024',
            amount: 200.00
        },
        {
            type:'Gcash',
            date:'May 16 2024',
            amount: 200.00
        },
        {
            type:'Gcash',
            date:'May 16 2024',
            amount: 200.00
        },
        {
            type:'Gcash',
            date:'May 16 2024',
            amount: 200.00
        }
    ]
  return (
    <section className='cashins-p-container'>
        <div className="cashin-p-body">
            <div className="cashin-p-header">
                <h1>Cash-ins History</h1>
            </div>
            <div className="cashin-p-data-wrapper">
            {data.map((detail:any,index) => (
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
            ))}
            </div>

            <div className="cpbody-paginator">
                <button>Prev</button>
                <span>1</span>
                <button className='cpbodyp-next'>Next</button>
            </div>
        </div>
    </section>
  )
}

export default CashinsPage