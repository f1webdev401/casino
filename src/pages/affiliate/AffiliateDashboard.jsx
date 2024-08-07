import '../../assets/css/affiliate/AffiliateDashboard.css'
const AffiliateDashboard = () => {
  return (
    <section className='affiliate-d-container'>
        <div className="adc-header">
            <h1>Welcome to Affiliate Dashboard</h1>
        </div>
        <div className="adc-link">
            <span>Affiliate Link</span>
            <div className="adc-link-text">

            <span>12310-okasdkn1230-9</span>
            <button>Copy Link</button>
            </div>
            <div className="adc-description">
                <span>Share the Link to anyone and get a 10% php commision every time they cashin</span>
            </div>
        </div>

        <div className="adc-e-p">

        <div className="adc-earnings">
            <span className='adc-title'>Earnings</span>
            <div className="adc-earning-box">
                <span>0 PHP</span>
            </div>
            <div className="adc-e-action">
            <button>Cashout</button>
            </div>
        </div>

        <div className="adc-referrals">
            <span>Referrals</span>
            <div className="adc-referral-box">
                <span>0</span>
            </div>
        </div>
        </div>
        <div className="adc-active-task">
            <span>Task</span>
            <div className="adc-task-box">
                <span>No Task</span>
                <button>Get Task</button>
            </div>
        </div>

    </section>
  )
}

export default AffiliateDashboard