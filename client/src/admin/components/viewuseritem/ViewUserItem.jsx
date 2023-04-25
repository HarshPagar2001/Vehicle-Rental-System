import "./ViewUserItem.css"
import Menu from "../menu/Menu"
import useFetch from "../../../hooks/useFetch"
import DashboardUser from "../dashboarduser/DashboardUser"
import { useLocation } from "react-router-dom"

const ViewUserItem = () => {

    const location = useLocation()
    const id = location.pathname.split("/")[4]

    const { data, loading } = useFetch(`/users/user/${id}`)

    return (
<div className="AdminUser">
<Menu/>
    <div className="AdminUserContainer">
    <DashboardUser/>
    {loading ? ("Loading") : 
        (<div className="AdminUserDataContainer">
        <div className="AdminUserData">
            <h2>User Details</h2>
            <div className="AdminUserDataImage">
                <img src={data.photo} alt="" />
            </div>
            <span>Username: {data.username}</span>
            <span>Email: {data.email}</span>
            <span>Phone: {data.phone}</span>
        </div>
        </div>)}
        
    </div>
    </div>
)}

export default ViewUserItem