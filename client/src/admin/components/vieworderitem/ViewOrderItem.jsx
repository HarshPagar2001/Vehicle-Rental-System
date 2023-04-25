import "./ViewOrderItem.css"
import Menu from "../menu/Menu"
import useFetch from "../../../hooks/useFetch"
import DashboardUser from "../dashboarduser/DashboardUser"
import { useLocation } from "react-router-dom"

const ViewOrderItem = () => {

    const location = useLocation()
    const id = location.pathname.split("/")[4]

    const { data, loading } = useFetch(`/order/orders/${id}`)


    return (
<div className="AdminOrder">
<Menu/>
    <div className="AdminOrderContainer">
    <DashboardUser/>
    {loading ? ("Loading") : 
        (<div className="AdminOrderDataContainer">
        <div className="AdminOrderData">
            <h2>Order Details</h2>
            <span>Payment ID: {data.paymentid}</span>
            <span>Username: {data.username}</span>
            <span>Vehicle: {data.vehicle}</span>
            <span>City: {data.city}</span>
            <span>Start: {data.start}</span>
            <span>End: {data.end}</span>
            <span>Address: {data.address}</span>
            <span>Time: {data.time}</span>
        </div>
        </div>)}
        
    </div>
    </div>
)}

export default ViewOrderItem