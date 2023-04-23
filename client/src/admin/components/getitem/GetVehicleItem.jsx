import axios from "axios"
import { useNavigate } from "react-router-dom"

const GetVehicleItem = ({item}) => {

    const Navigate = useNavigate()

    const Edit = () => {
        Navigate(`/admin/dashboard/vehicles/${item._id}`)
    }

    const Delete = async e => {
        e.preventDefault()
            try {
                await axios.delete(`/vehicles/${item._id}`)
                window.location.reload();
            } catch (error) {
            }
        }

    return (
            <tr>
                <td>
                    <img src={item.photos[0]} alt=""/>
                </td>
                <td>{item.name}</td>
                <td>{item.city}</td>
                <td>
                    <div className="GetVehicleButton">
                    <div className="EditButton" onClick={Edit}>Edit</div>
                    <div className="DeleteButton" onClick={Delete}>Delete
                    </div>
                    </div>
                </td>
            </tr>
)}

export default GetVehicleItem