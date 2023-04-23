import "./Profile.css"
import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer"
import { useContext, useState } from "react"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"

const Profile = () => {

    const Username = document.getElementById("username")
    const Email = document.getElementById("email")
    const Phone = document.getElementById("phone")

    const { user } = useContext(AuthContext)

    const [ value, setValue ] = useState("")

    const [ credentials, setCredentials] = useState({
        username:undefined,
        photo:undefined,
        email:undefined,
    })

    const [ username, setUsername] = useState({
        username:undefined,
    })

    const [ email, setEmail] = useState({
        email:undefined,
    })

    const [ phone, setPhone] = useState({
        email:undefined,
    })

    const [ error, setError] = useState("")
    const [ update, setUpdate ] = useState("")

    const handleChange = (e) => {
        setCredentials(prev => ({...prev, _id: user._id, photo: image, admin: user.admin, [e.target.id]: e.target.value}))

        setUsername(prev => ({...prev, _id: user._id, photo: image, admin: user.admin, email: user.email, phone: user.phone, 
        username: e.target.value}))

        setEmail(prev => ({...prev, _id: user._id, photo: image, admin: user.admin, username: user.username, phone: user.phone, 
        email: e.target.value}))

        setPhone(prev => ({...prev, _id: user._id, photo: image, admin: user.admin, username: user.username, email: user.email, phone: e.target.value}))
    }

    const handleUpdate = async e => {
        e.preventDefault()
        const Emailregex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
        const PhoneRegex = /[0-9]/

        if(Username.value === "" && Email.value === "" && 
        Phone.value === ""){
            setValue("Username required")
        }
        else if(Username.value !== "" && Email.value === "" && 
        Phone.value === ""){
            try {
                await axios.put(`/profile/username/${user._id}`, credentials)
                .then((response) => {
                    if(response.status === 200){
                        setUpdate(response.data)
                        localStorage.setItem("user", JSON.stringify(
                            username))
                    }
                })
            } catch (error) {
                if(error.response.status === 400){
                    setError(error.response.data.message)
                }
            }
        }
        else if(Username.value === "" && !Email.value.match(Emailregex) && 
        Phone.value === ""){
            setValue("Invalid email")
        }
        else if(Username.value !== "" && !Email.value.match(Emailregex) && 
        Phone.value === ""){
            setValue("Invalid email")
        }
        else if(Username.value === "" && Email.value.match(Emailregex) && 
        Phone.value === ""){
            try {
                await axios.put(`/profile/email/${user._id}`, 
                credentials)
                .then((response) => {
                    if(response.status === 200){
                        setUpdate(response.data)
                        localStorage.setItem("user", JSON.stringify(
                            email))
                    }
                })
            } catch (error) {
                if(error.response.status === 400){
                    setError(error.response.data.message)
                }
            }
        }
        else if(Username.value !== "" && !Email.value.match(Emailregex) && 
        Phone.value !== ""){
            setValue("Invalid email")
        }
        else if(Username.value === "" && Email.value === "" && 
        !Phone.value.match(PhoneRegex)){
            setValue("Invalid contact")
        }
        else if(Username.value === "" && Email.value === "" && 
        Phone.value.length < 10){
            setValue("Enter at least 10 digits")
        }
        else if(Username.value === "" && Email.value === "" && 
        Phone.value.match(PhoneRegex)){
            try {
                await axios.put(`/profile/phone/${user._id}`, 
                credentials)
                .then((response) => {
                    if(response.status === 200){
                        setUpdate(response.data)
                        localStorage.setItem("user", JSON.stringify(
                            phone))
                    }
                })
            } catch (error) {
                if(error.response.status === 400){
                    setError(error.response.data.message)
                }
            }
        }
        else if(Username.value !== "" && Email.value !== "" && 
        !Phone.value.match(PhoneRegex)){
            setValue("Invalid phone")
        }
        else if(Username.value !== "" && Email.value !== "" && 
        Phone.value.length < 10){
            setValue("Enter at least 10 digits")
        }
        else if(Username.value !== "" && Email.value !== "" && 
        Phone.value !== ""){
            try {
                await axios.put(`/profile/${user._id}`, credentials)
                .then((response) => {
                    if(response.status === 200){
                        setUpdate(response.data)
                        localStorage.setItem("user", JSON.stringify(credentials))
                    }
                })
            } catch (error) {
                if(error.response.status === 400){
                    setError(error.response.data.message)
                }
            }
        }
    }

    const [ image, setImage ] = useState("")

        function FileConvert(e){
            console.log(e)
            var reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
                reader.onload = () => {
                    console.log(reader.result)
                    setImage(reader.result)
                }
                reader.onerror = error => {
                    console.log("Error", error)
                }
        }

    return (
<div>
<Navbar/>
<div className="UserProfile">
    <div className="UserProfileMainContainer">
        <div className="UserProfileContainer">
        <h2>User Profile</h2>
        <div className="UserProfileHeader">
            <div className="UserProfilePhoto">
                <div className="UserPhoto">
                {image === "" || image === null ? 
                <img src={user.photo} alt=""/> : 
                <img src={image} alt=""/>} 
            </div>
            <input accept="image/*" type="file" id="Upload" 
            className="Upload"
            onChange={FileConvert}/>
            <label htmlFor="Upload" className="UserPhotoUpload">Upload</label>
            </div>
                <div className="UserInformation">
                <div class="UserBox">
                <label>Username</label>
                <input type="text" id="username" 
                placeholder={user.username}
                onChange={handleChange} required/>
                </div>

                <div class="UserBox">
                <label>Email</label>
                <input type="text" id="email" 
                placeholder={user.email}
                onChange={handleChange} required/>
                </div>

                <div class="UserBox">
                <label>Phone</label>
                <input type="text" id="phone" 
                placeholder={user.phone}
                onChange={handleChange} required/>
                </div>

                {error && <span className="ErrorMessage">{error}</span>}

                {update && <span className="UpdateMessage">{update}</span>}

                {value && <span className="ErrorMessage">{value}</span>}

                <span className="PasswordLink"><a href="/profile/password">Change Password</a></span>

                <button className="UpdateButton" onClick={handleUpdate}>Update</button>
            </div>
        </div>
        </div>
        
    </div>
</div>
<Footer/>
</div>
)}

export default Profile