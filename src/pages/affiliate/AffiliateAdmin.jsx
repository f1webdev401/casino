import AffialateNav from "./AffialateNav"
import '../../assets/css/affiliate/AffiliateAdmin.css'
import { Outlet } from "react-router-dom"
const AffiliateAdmin = () => {
  return (
    <section className="affilate-a-container">
        <AffialateNav/>
        <Outlet/>
    </section>
  )
}

export default AffiliateAdmin