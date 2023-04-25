import { useContext } from "react"
import DashboardUser from "../components/dashboarduser/DashboardUser"
import Menu from "../components/menu/Menu"
import "./Dashboard.css"
import { AuthContext } from "../../context/AuthContext"

const Dashboard = () => {

    const { user} = useContext(AuthContext)

    return (
<div className="Dashboard">
<Menu/>
<div className="DashboardContainer">
<DashboardUser/>
<div className="DashboardItems">
    <div className="DashboardItem">
    <span>Welcome {user.username}</span>
    <span>Admin Dashboard</span>
    </div>
</div>
</div>
</div>
)}

export default Dashboard