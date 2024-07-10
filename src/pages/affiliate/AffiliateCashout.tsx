import '../../assets/css/affiliate/AffiliateCashout.css'
const AffiliateCashout = () => {
  return (
    <section className='afc-container'>
        <div className="afc-header">
            <h1>Your'e current balance is</h1>
            <span>300.00 PHP</span>
        </div>
        <p className='afc-b-head'>Minimum Cashout <span>500.00 PHP</span></p>

        <form className="afc-cashout-form">
            <h2>Cashout</h2>
            <div className="afc-form-input">
                <label htmlFor="">Amount</label>
                <input type="text" />
            </div>
            <div className="afc-form-input">
                <label htmlFor="">Gcash Number:</label>
                <input type="text" />
            </div>
            <button>Submit</button>
        </form>
        <p>Cashout takes 10 to 30 mins</p>
    </section>
  )
}

export default AffiliateCashout