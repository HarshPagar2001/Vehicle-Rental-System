import axios from "axios"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import "./SignUp.css"

const SignUp = () => {

    const Username = document.getElementById("username")
    const Email = document.getElementById("email")
    const Phone = document.getElementById("phone")
    const Password = document.getElementById("password")

    const [ value, setValue ] = useState("")

    const [ error, setError] = useState("")

    const [ credentials, setCredentials] = useState({
        username:undefined,
        email:undefined,
        password:undefined
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials(prev => ({...prev, [e.target.id]: e.target.value}))
    }

    const handleClick = async e => {
        e.preventDefault()
        const Emailregex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
        const PhoneRegex = /[0-9]/

        if(Username.value === "" && Email.value === ""){
            setValue("Username required")
        }
        else if(Username.value === ""){
            setValue("Username required")
        }
        else if(Email.value === ""){
            setValue("Email required")
        }
        else if(!Email.value.match(Emailregex)){
            setValue("Invalid Email")
        }
        else if(Phone.value === ""){
            setValue("Phone required")
        }
        else if(!Phone.value.match(PhoneRegex)){
            setValue("Invalid Phone")
        }
        else if(Phone.value.length < 10){
            setValue("Enter at least 10 digits")
        }
        else if(Password.value === ""){
            setValue("Password required")
        } else {
            try {
                await axios.post("/auth", credentials)
                navigate("/login")
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
<div class="Main">
    <div class="MainContainer">
            <h2>Sign Up</h2>
            <div class="InputBox">
                <input type="text" id="username" onChange={handleChange} required/>
                <label>Username</label>
            </div>

            <div class="InputBox">
                <input type="text" id="email" onChange={handleChange} required/>
                <label>Email</label>
            </div>

            <div class="InputBox">
                <input type="text" id="phone" onChange={handleChange} required/>
                <label>Phone</label>
            </div>

            <div class="InputBox">
                <input type={type} id="password" onChange={handleChange} class="CreatePassword" required/>
                <label>Password</label>
                <span onClick={handleToggle}><FontAwesomeIcon icon={icon}/></span>
            </div>

            {error && <span className="Message">{error}</span>}

            {value && <span className="ErrorMessage">{value}</span>}

            <div class="ButtonContainer">
                <button class="Button" onClick={handleClick}>Sign Up</button>
            </div>

            <div class="Link">
                <span>Already have an account? <a href="/login" class="SignUpLink">Login</a></span>
            </div>
        </div>
</div>
)}

export default SignUp