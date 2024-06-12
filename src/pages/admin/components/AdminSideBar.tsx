import { NavLink } from 'react-router-dom'
import '../../../assets/css/admin/components/AdminSideBar.css'
const AdminSideBar = () => {
  return (
    <aside className='asb-container'>
      <div className="asb-header">
        <h1><span>SMM</span> ADMIN</h1>
      </div>
      <div className="asb-links">
      <NavLink to={''}>
        <i className="fa-solid fa-table"></i>
        <span>Dashboard</span>
      </NavLink>
      <NavLink to={'adminusers'}>
        <i className="fa-solid fa-users"></i>
        <span>Users</span>
      </NavLink>
      <NavLink to={'adminwithdrawals'}>
        <i className="fa-solid fa-money-bill-transfer"></i>
        <span>Withdrawals</span>
      </NavLink>
      </div>
    </aside>
  )
}

export default AdminSideBar