import AdminSideBar from "./components/AdminSideBar"
import '../../assets/css/admin/AdminHomePage.css'
import { Outlet } from "react-router-dom"
const AdminHomePage = () => {
  return (
    <section className="admin-hp-container">
        <AdminSideBar/>
        <div className="admin-body-container">
          <div className="admin-body-header">
            <div className="abh-text">
            <h1>Welcome ! <span>Muhamad Ali</span></h1>
            <span>May 10 2020</span>
            </div>
            <form className="abh-search-bar">
              <input type="text" />
              <button><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
          </div>
          
        <Outlet/>
        </div>
    </section>
  )
}

export default AdminHomePage