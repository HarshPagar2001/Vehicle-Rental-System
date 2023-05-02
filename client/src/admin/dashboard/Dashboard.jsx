import DashboardUser from "../components/dashboarduser/DashboardUser"
import Menu from "../components/menu/Menu"
import "./Dashboard.css"
import useFetch from "../../hooks/useFetch"
import GetItemLoad from "../components/getitemload/GetItemLoad"
import DashboardGetOrderItem from "../components/getitem/DashboardGetOrderItem"

const Dashboard = () => {

    const { vehicles } = useFetch("/vehicles/document")
    const { users } = useFetch("/auth/document")
    const { orders } = useFetch("/order/document")

    const { data, loading } = useFetch("/order/orders")

    return (
<div className="Dashboard">
<Menu/>
<div className="DashboardContainer">
<DashboardUser/>
        <div className="DashboardItems">
            <div className="DashboardItem">
            <span>Vehicles: {vehicles}</span>
        </div>

        <div className="DashboardItem">
            <span>Users: {users}</span>
        </div>

        <div className="DashboardItem">
            <span>Orders: {orders}</span>
        </div>
        </div>

        <div className="OrderTable">
        <table>
        <thead>
            <tr>
                <th>Payment ID</th>
                <th>Vehicle</th>
                <th>Username</th>
                <th>City</th>
            </tr>
        </thead>
        <tbody>
        {loading ? <GetItemLoad/> : <>
        {data.map((item) => (
            <DashboardGetOrderItem item={item} key={item._id}/>))}</>} 
        </tbody>
    </table>
    </div>
</div>
</div>
)}

export default Dashboard