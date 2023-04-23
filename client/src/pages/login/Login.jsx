import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import "./Login.css"

const Login = () => {
    const [ credentials, setCredentials] = useState({
        email:undefined,
        password:undefined
    })

    const { loading, error, dispatch }  = useContext(AuthContext)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials(prev => ({...prev, [e.target.id]: e.target.value}))
    }

    const handleClick = async e => {
        e.preventDefault()
        dispatch({type:"LoginStart"})

        try {
            const res = await axios.post("/auth/login", credentials)
            dispatch({type:"LoggedIn", payload:res.data})
            navigate("/")
        } catch (err) {
            dispatch({type:"LoginEnd", payload:err.response.data})
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
        <h2>Login</h2>
        <div class="InputBox">
            <input type="text" id="email" onChange={handleChange} required/>
            <label>Email</label>
        </div>

        <div class="InputBox">
            <input type={type} id="password" onChange={handleChange} required/>
            <label>Password</label>
            <span onClick={handleToggle}><FontAwesomeIcon icon={icon}/></span>
        </div>

        {error && <span className="Message">{error.message}</span>}

        <div class="ButtonContainer">
        <button class="Button" onClick={handleClick} 
        disabled={loading}>Login</button>
        </div>

        <div class="Link">
            <span>Don't have an account? <a href="/signup" class="SignUpLink">SignUp</a></span>
        </div>
    </div>
</div>
)}

export default Login