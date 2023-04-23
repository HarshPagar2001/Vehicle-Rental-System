import "./Orders.css"
import Menu from "../../components/menu/Menu"
import useFetch from "../../../hooks/useFetch"
import GetItemLoad from "../../components/getitemload/GetItemLoad"
import { useState } from "react"
import DashboardUser from "../../components/dashboarduser/DashboardUser"
import GetOrderItem from "../../components/orderdata/GetOrderItem"

const Orders = () => {

    const [username, setUsername] = useState("")

    const { data, loading, refetch } = useFetch(
    username === "" ? `/order/orders` : `/order/orders?username=${username}`)

    const handleSearch = () => {
        refetch()
    }


    return (
<div className="GetOrder">
<Menu/>
    <div className="GetOrderTable">
    <DashboardUser/>
        <div className="GetOrderTableContainer">
        <input type="text" placeholder="Username" 
        className="GetOrderSearch"
        onChange={e => setUsername(e.target.value)}/>
        <div className="OrderSearch" 
        onClick={handleSearch}>Search</div>
        </div>
        <div className="OrderTable">
        <table>
        <thead>
            <tr>
                <th>Payment ID</th>
                <th>Vehicle</th>
                <th>Username</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody>
        {loading ? <GetItemLoad/> : <>
        {data.map((item) => (
            <GetOrderItem item={item} key={item._id}/>))}</>} 
        </tbody>
        </table>
        </div>
        </div>
    </div>
)}

export default Orders