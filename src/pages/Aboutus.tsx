import { NavLink } from 'react-router-dom'
import '../assets/css/pages/Aboutus.css'
const Aboutus = () => {
  return (
    <section className='about-container'>
        <div className="ap-header">
          <div className="ap-header-text">

          <h1>WELCOME TO</h1>
          <div className="ap-header-name">
            <h1>SMM PLAY</h1>
            <i className="fa-solid fa-star"></i>
          </div>
          </div>
        </div>

        <div className="ap-body-smm">
            <p><span>At SMM PLAY</span>, we are dedicated to providing an unparalleled gaming experience that combines thrilling entertainment with the utmost integrity. Located in the heart of the city, our state-of-the-art casino offers a unique blend of traditional games and modern amenities, ensuring every visit is memorable.</p>
        </div>

        <div className="ap-gaming-fairness">
          <h4>Our Commitment to Fairness</h4>
          <p>Integrity and fairness are the cornerstones of our operation. We understand that trust is paramount in the world of gaming, and we strive to earn and maintain your trust through transparency and fairness. Our gaming systems are regularly audited by independent third-party organizations to ensure all games are fair and random. We employ the latest technology to safeguard the integrity of our games and protect our playe</p>
        </div>

        <div className="ap-how-participate">
          <h4>How to Participate?</h4>
          <p>Participation is easy! Simply register for our grand opening event, and you'll be automatically entered into our giveaways. Additional entries can be earned through various activities during the event.</p>
          <div className="aphp-step">
            <p>Register Online: Sign up on our website to reserve your spot and enter the giveaways.</p>
            <p>Earn Extra Entries: Participate in our grand opening activities to increase your chances of winning.</p>
          </div>
        </div>

        <div className="ap-get-started">
          <NavLink to={"/register"}>Get Started</NavLink>
        </div>
    </section>
  )
}

export default Aboutus