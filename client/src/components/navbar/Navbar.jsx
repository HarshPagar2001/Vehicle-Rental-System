import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisVertical, faGear, faSun, faMoon } from "@fortawesome/free-solid-svg-icons"
import "./Navbar.css"
import { DarkModeContext } from "../../context/DarkModeContext"
import Image from "./Images/Logo.png"

const Navbar = () => {

    const [openProfile, setOpenProfile] = useState (false)

    const { darkMode, Toggle } = useContext(DarkModeContext)

    const { user, dispatch} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleClick = async e => {
        e.preventDefault()

        console.log(user.admin)

        if(user.admin === "admin"){
        try {
            navigate("/admin/dashboard")
        } catch (err) {
        }} else {
        }
    }

    const Logout = async e => {
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
<div className="Nav">
    <div className="NavContainer">
        <div className="NavItem">
            <img src={Image} alt="" />
            <div className="NavLinks">
                <ul className="NavMenu">
                    <li><a href="/">Home</a></li>
                    <li><a href="/contact">Contact</a></li>
                    {user ? (<div className="User">
                        <div className="UserNavPhoto">
                        <img src={user.photo} alt="" />
                        </div>
                    {user.username}<div className="UserMenu" onClick={() => (setOpenProfile(!openProfile))}>
                    <FontAwesomeIcon icon={faEllipsisVertical}/></div></div>) : (<div className="SignUpButton">
                    <a href="/signup">Sign Up</a></div>)}
                    {openProfile &&<div className="Profile">

                    <div className="ProfileContainer">
                    <div className="UsernameContainer">
                    {user ? (<div className="User">{user.username}</div>) : (<div className="User">User</div>)}
                    <a href="/profile">
                    <div className="Setting">
                    <FontAwesomeIcon icon={faGear}/></div></a>
                    </div>
                    </div>

                    {user.admin === "admin" ? <div className="AdminLogin" onClick={handleClick}>Dashboard</div> : <div></div>}

                    <div className="Logout" onClick={Logout}>Logout</div>
                    </div>}
                    <div className="Switch">
                        {darkMode ? <FontAwesomeIcon className="Sun" icon={faSun} onClick={Toggle}/> : <FontAwesomeIcon className="Moon" icon={faMoon} onClick={Toggle}/>}
                    </div>
                </ul>
            </div>
        </div>
    </div>
</div>
)}

export default Navbar