import { useContext } from "react"
import "./Menu.css"
import { AuthContext } from "../../../context/AuthContext"
import { useNavigate } from "react-router-dom"

const Menu = () => {

    const { dispatch} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault()
        dispatch({type:"LoginStart"})

        try {
            dispatch({type:"LogOut"})
            navigate("/login")
            localStorage.setItem("UserID", null)
        } catch (err) {
            dispatch({type:"LoginEnd", payload:err.response.data})
        }
    }


    return (
<div className="Menu">
    <div className="MenuContainer">
        <div className="MenuHeader">
            <span className="MenuHeaderLogo"></span>
            <span className="MenuHeaderText">Admin Dashboard</span>
        </div>
        <div className="MenuLink">
            <div className="MenuList">
                <div className="MenuTitle">
                <span><a href="/admin/dashboard">Home</a></span>
                <span><a href="/admin/dashboard/orders">Orders</a></span>
                <span><a href="/admin/dashboard/user">Users</a></span>
                <span><a href="/admin/dashboard/vehicle">Vehicles
                </a></span>
                <span><a href="/">Website</a></span>
                <span onClick={handleClick}>Logout</span>
                </div>
            </div>
            </div>
        </div>
    </div>
)}

export default Menu