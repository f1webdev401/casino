import '../../assets/css/affiliate/AffiliateNav.css'
import { NavLink } from 'react-router-dom'
const AffialateNav = () => {
  return (
    <nav className='affiliate-nav'>
        <div className="an-banner">
            <h1>Afilliate Admin</h1>
        </div>

        <div className='an-links'>
          <NavLink to={''}>Dashboard</NavLink>
          <NavLink to={'#'}>Task</NavLink>
          <NavLink to={'cashout'}>Cashout</NavLink>
        </div>

    </nav>
  )
}

export default AffialateNav