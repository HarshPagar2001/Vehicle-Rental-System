import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

const GetUserItem = ({item}) => {

    const Delete = async e => {
        e.preventDefault()
            try {
                await axios.delete(`/auth/${item._id}`)
                window.location.reload();
            } catch (error) {
            }
        }

    return (
        <tr>
        <td>
            <div className="UserItemPhoto">
            {item.photo === "" ? 
            <img src={<FontAwesomeIcon icon={faUser}/>} alt=""/> : 
            <img src={item.photo} alt=""/>}
            </div>
        </td>
        <td>{item.username}</td>
        <td>{item.email}</td>
        <td>
            <div className="GetUserButton">
            <div className="DeleteButton" onClick={Delete}>Delete</div>
            </div>
        </td>
        </tr>
)}

export default GetUserItem