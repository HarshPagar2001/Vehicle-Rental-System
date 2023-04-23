import "./AdminUser.css"
import Menu from "../../components/menu/Menu"
import { useState } from "react"
import axios from "axios"
import DashboardUser from "../../components/dashboarduser/DashboardUser"

const AdminUser = () => {

    const [ credentials, setCredentials] = useState({
        username:undefined,
        email:undefined,
        password:undefined
    })

    const [ error, setError] = useState("")
    const [ update, setUpdate ] = useState("")

    const handleChange = (e) => {
        setCredentials(prev => ({...prev, [e.target.id]: e.target.value, photo: image}))
    }

    const handleClick = async e => {
        e.preventDefault()
            try {
                await axios.post(`/vehicles`, credentials)
                .then((response) => {
                    if(response.status === 200){
                        setUpdate(response.data)
                    }
                })
            } catch (error) {
                if(error.response.status === 400){
                    setError(error.response.data.message)
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
<div className="AdminUser">
<Menu/>
    <div className="AdminUserContainer">
    <DashboardUser/>
        <div className="UserEditContainer">
            <div className="UserPhotoEdit">
            <div className="AdminUserPhoto">
                {image === "" || image === null ? "" : 
                <img src={image} alt=""/>} 
            </div>
            <input accept="image/*" type="file" id="Upload" 
            className="Upload"
            onChange={FileConvert}/>

            <label htmlFor="Upload" className="UserUpload">Upload</label>
            </div>
        <div className="UserEdit">
            <label>Username</label>
            <input type="text" id="username" 
            onChange={handleChange} required/>
            <label>Email</label>
            <input type="text" id="email" 
            onChange={handleChange} 
            required/>
            <label>Password</label>
            <input type="text" id="password" 
            onChange={handleChange} 
            required/>
        </div>

        <div className="UserEdit">
            <label>Phone</label>
            <input type="text" id="phone" 
            onChange={handleChange} 
            required/>

        {error && <span className="ErrorMessage">{error}</span>}

        {update && <span className="UpdateMessage">{update}</span>}

        <div className="UserEditButton" onClick={handleClick}>Create</div>
        </div>
    </div>
    </div>
    
    </div>
)}

export default AdminUser