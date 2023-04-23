import "./AdminVehicle.css"
import Menu from "../../components/menu/Menu"
import { useState } from "react"
import axios from "axios"
import DashboardUser from "../../components/dashboarduser/DashboardUser"

const AdminVehicle = () => {

    const [ credentials, setCredentials] = useState({
        name:undefined,
        photos:undefined,
        description:undefined,
        city:undefined,
        type:undefined,
        price:undefined
    })

    const [ error, setError] = useState("")
    const [ update, setUpdate ] = useState("")

    const handleChange = (e) => {
        setCredentials(prev => ({...prev, [e.target.id]: e.target.value,photos: image}))
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
<div className="AdminVehicle">
<Menu/>
    <div className="AdminVehicleContainer">
    <DashboardUser/>
        <div className="VehicleEditContainer">
            <div className="VehiclePhotoEdit">
            <div className="AdminVehiclePhoto">
                {image === "" || image === null ? "" : 
                <img src={image} alt=""/>} 
            </div>
            <input accept="image/*" type="file" id="Upload" 
            className="Upload"
            onChange={FileConvert}/>

            <label htmlFor="Upload" className="VehicleUpload">Upload</label>
            </div>
        <div className="VehicleEdit">
        <label>Name</label>
        <input type="text" id="name" 
        onChange={handleChange} required/>
        <label>Description</label>
        <input type="text" id="description" 
        onChange={handleChange} required/>
        <label>City</label>
        <input type="text" id="city" 
        onChange={handleChange} required/>
        </div>

        <div className="VehicleEdit">
        <label>Type</label>
        <input type="text" id="type" 
        onChange={handleChange} required/>
        <label>Price</label>
        <input type="text" id="price" 
        onChange={handleChange} required/>
        
        {error && <span className="ErrorMessage">{error}</span>}

        {update && <span className="UpdateMessage">{update}</span>}

        <div className="VehicleEditButton"
        onClick={handleClick}>Create</div>
        </div>
        </div>
        </div>
    </div>
)}

export default AdminVehicle