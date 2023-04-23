import { useContext } from "react"
import "./DashboardUser.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons"
import { AuthContext } from "../../../context/AuthContext"
import { DarkModeContext } from "../../../context/DarkModeContext"

const DashboardUser = () => {

    const { user} = useContext(AuthContext)

    const { darkMode, Toggle } = useContext(DarkModeContext)

    return (
<div className="DashboardUser">
    <div className="DashboardUserContainer">
        <div className="DashBoardUserItem">
        
        {user ? (<div className="AdminProfile">
            <div className="AdminProfilePhoto">
                <img src={user.photo} alt="" />
            </div>{user.username}</div>) : (<div className="AdminSignUpButton">
        <a href="/signup">Sign Up</a></div>)}
        
        <div className="Switch">
        {darkMode ? <FontAwesomeIcon className="Sun" icon={faSun} onClick={Toggle}/> : <FontAwesomeIcon className="Moon" icon={faMoon} onClick={Toggle}/>}
        </div>
        </div>
    </div>
    </div>
)}

export default DashboardUser