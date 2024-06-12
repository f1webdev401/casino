import '../../assets/css/pages/transactions/WithdrawPage.css'
const WithdrawPage = () => {
  return (
    <section className='withdraw-p-container'>

      <div className="withdraw-p-body">
          <div className="withdraw-p-header">
            <h1>Withdraw Credits</h1>
          </div>
          <div className="withdraw-p-wallet-outlet">
              <span className='wpwo-header'>Available E-Wallet</span>
            <div className="withdraw-wallet">
              <span>Gcash</span>
            </div>
          </div>
          <form action="" className='withdraw-form'>
              <div className="withdraw-input-wrapper">
                <label htmlFor="">Gcash Number:</label>
                <input type="text" />
              </div>
              <div className="withdraw-input-wrapper">
                <label htmlFor="">Amount to Withdraw:</label>
                <input type="text" />
              </div>
              <button>Submit</button>
          </form>
          <div className="withdraw-info">
            <p>Withdrawal Takes 5 - 30 minutes</p>
          </div>
      </div>
    </section>
  )
}

export default WithdrawPage