import "./GetUser.css"
import Menu from "../../components/menu/Menu"
import GetUserItem from "../../components/getitem/GetUserItem"
import useFetch from "../../../hooks/useFetch"
import GetItemLoad from "../../components/getitemload/GetItemLoad"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import DashboardUser from "../../components/dashboarduser/DashboardUser"

const GetUser = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")

    const { data, loading, refetch } = useFetch(
    username === "" ? `/users` : `/users?username=${username}`)

    const handleSearch = () => {
        refetch()
    }

    const handleCreate = () => {
        navigate("/admin/dashboard/user/create")
    }

    return (
<div className="GetUser">
<Menu/>
    <div className="GetUserTable">
    <DashboardUser/>
        <div className="GetUserTableContainer">
        <div className="AlignContent">
        <input type="text" placeholder="Username" className="GetUserSearch"
        onChange={e => setUsername(e.target.value)}/> 
        <div className="UserSearch" 
        onClick={handleSearch}>Search</div>
        </div>
        <div className="AlignContent">
        <div className="CreateUser" onClick={handleCreate}>Create User</div>
        </div>
        </div>  
        <div className="UserTable">
        <table>
        <thead>
            <tr>
                <th>Photo</th>
                <th>Username</th>
                <th>Email</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody>
        {loading ? <GetItemLoad/> : <>
        {data.map((item) => (
            <GetUserItem item={item} key={item._id}/>))}</>} 
        </tbody>
    </table>
    </div>
        </div>
    </div>
)}

export default GetUser