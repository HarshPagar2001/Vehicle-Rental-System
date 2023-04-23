import "./Password.css"
import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useContext, useState } from "react"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"

const Password = () => {

    const { user } = useContext(AuthContext)

    const OldPassword = document.getElementById("password")
    const NewPassword = document.getElementById("NewPassword")
    const Password = document.getElementsByClassName(".password")

    const [ value, setValue ] = useState("")

    const [ credentials, setCredentials] = useState({
        password:undefined
    })

    const [ newPassword, setNewPassword] = useState({
        password:undefined
    })

    const [ error, setError] = useState("")
    const [ update, setUpdate ] = useState("")
    
    const handleChange = (e) => {
        setCredentials(prev => ({...prev, [e.target.id]: e.target.value}))
    }

    const handlePassword = (e) => {
        setNewPassword(prev => ({...prev, [e.target.className]: e.target.value}))
    }

    const handleUpdate = async e => {
        e.preventDefault()

        if(OldPassword.value === ""){
            setValue("Old password required")
        } else {
            try {
                await axios.put(`/profile/password/${user._id}`, credentials)
                .then((response) => {
                if(response.status === 200){

                if(NewPassword.value === ""){
                    setValue("New password required")
                } 
                else if(Password.value === ""){
                    setValue("Enter confirm password")
                } 
                else if(NewPassword.value === Password.value){
                    setValue("Password does not match")
                } else {
                try {
                    axios.put(`/profile/password/update/${user._id}`, newPassword)
                    .then((response) => {
                        if(response.status === 200){
                            setUpdate(response.data)
                        }
                    })
                } catch (error) {
                    if(error.response.status === 400){
                        setError(error.response.data.message)
                    }
                }}}
            })
            } catch (error) {
                if(error.response.status === 400){
                    setError(error.response.data.message)
                }
            }
        }
    }

    const [ type, setType ] = useState("password")
    const [ icon, setIcon ] = useState(faEye)

    const handleToggle = () => {
        if(type === "password"){
            setType("text")
            setIcon(faEyeSlash)
        }
        else{
            setType("password")
            setIcon(faEye)
        }
    }

    
    return (
<div>
<Navbar/>
<div className="Password">
    <div className="PasswordMainContainer">
    <div className="PasswordContainer">
            <h2>Update Password</h2>
            <div class="PasswordBox">
                <label>Old Password</label>
                <input type={type} id="password" 
                onChange={handleChange} required/>
                <span onClick={handleToggle}><FontAwesomeIcon icon={icon}/></span>
            </div>

            <div class="PasswordBox">
                <label>New Password</label>
                <input type={type} id="NewPassword" 
                onChange={handleChange} required/>
                <span onClick={handleToggle}><FontAwesomeIcon icon={icon}/></span>
            </div>

            <div class="PasswordBox">
                <label>Confirm Password</label>
                <input type={type} className="password"
                onChange={handlePassword} required/>
                <span onClick={handleToggle}><FontAwesomeIcon icon={icon}/></span>
            </div>

            {error && <span className="PasswordErrorMessage">{error}</span>}

            {update && <span className="PasswordUpdateMessage">{update}</span>}

            {value && <span className="PasswordErrorMessage">{value}</span>}

            <button className="PasswordUpdateButton" 
            onClick={handleUpdate}>Update</button>
        </div>
    </div>
</div>
<Footer/>
</div>
)}

export default Password