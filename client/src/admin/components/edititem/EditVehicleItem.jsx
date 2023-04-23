import "../../pages/adminvehicle/AdminVehicle.css"
import Menu from "../../components/menu/Menu"
import { useState } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"
import useFetch from "../../../hooks/useFetch"
import DashboardUser from "../dashboarduser/DashboardUser"

const EditVehicleItem = () => {

    const location = useLocation()
    const id = location.pathname.split("/")[4]

    const { data, loading } = useFetch(`/vehicles/vehicle/${id}`)

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
        setCredentials(prev => ({...prev, [e.target.id]: e.target.value, photos: image}))
    }

    const handleClick = async e => {
        e.preventDefault()
            try {
                await axios.put(`/vehicles/${id}`, credentials)
                .then((response) => {
                    if(response.status === 200){
                        setUpdate("Vehicle Updated")
                    }
                })
            } catch (error) {
                if(error.response.status === 400){
                    setError("Error occurred")
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
    {loading ? ("Loading") : 
        (<div className="VehicleEditContainer">
            <div className="VehiclePhotoEdit">
            <div className="AdminVehiclePhoto">
                <img src={image ? image : data.photos} alt=""/>
            </div>
            <input accept="image/*" type="file" id="Upload" 
            className="Upload"
            onChange={FileConvert}/>

            <label htmlFor="Upload" className="VehicleUpload">Upload</label>
            </div>
        <div className="VehicleEdit">
        <label>Name</label>
        <input type="text" id="name" placeholder={data.name} 
        onChange={handleChange} required/>
        <label>Description</label>
        <input type="text" id="description" placeholder={data.description} 
        onChange={handleChange} required/>
        <label>City</label>
        <input type="text" id="city" placeholder={data.city} 
        onChange={handleChange} required/>
        </div>

        <div className="VehicleEdit">
        <label>Type</label>
        <input type="text" id="type" placeholder={data.type} 
        onChange={handleChange} required/>
        <label>Price</label>
        <input type="text" id="price" placeholder={data.price} 
        onChange={handleChange} required/>
        
        {error && <span className="ErrorMessage">{error}</span>}

        {update && <span className="UpdateMessage">{update}</span>}

        <div className="VehicleEditButton"
        onClick={handleClick}>Update</div>
        </div>
        </div>)}
        </div>
    </div>
)}

export default EditVehicleItem