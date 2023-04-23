import "./GetVehicle.css"
import Menu from "../../components/menu/Menu"
import GetVehicleItem  from "../../components/getitem/GetVehicleItem"
import useFetch from "../../../hooks/useFetch"
import GetItemLoad from "../../components/getitemload/GetItemLoad"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import DashboardUser from "../../components/dashboarduser/DashboardUser"

const GetVehicle = () => {

    const navigate = useNavigate()

    const [destination, setDestination] = useState("")

    const { data, loading, refetch } = useFetch(
    destination === "" ? `/vehicles` : `/vehicles?city=${destination}`)

    const handleSearch = () => {
        refetch()
    }

    const handleCreate = () => {
        navigate("/admin/dashboard/vehicle/create")
    }


    return (
<div className="GetVehicle">
<Menu/>
    <div className="GetVehicleTable">
    <DashboardUser/>
        <div className="GetVehicleTableContainer">
        <input type="text" placeholder="Location" className="GetVehicleSearch"
        onChange={e => setDestination(e.target.value)}/>
        <div className="VehicleSearch" 
        onClick={handleSearch}>Search</div>
        <div className="CreateVehicle" onClick={handleCreate}>Create Vehicle</div>
        </div>
        <div className="VehicleTable">
        <table>
        <thead>
            <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Location</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody>
        {loading ? <GetItemLoad/> : <>
        {data.map((item) => (
            <GetVehicleItem item={item} key={item._id}/>))}</>} 
        </tbody>
        </table>
        </div>
        </div>
    </div>
)}

export default GetVehicle