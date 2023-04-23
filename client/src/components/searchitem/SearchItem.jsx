import "./SearchItem.css"
import { useNavigate } from "react-router-dom"

const SearchItem = ({item}) => {

    const Navigate = useNavigate()

    const HandleRent = () => {
        Navigate(`/vehicles/${item._id}`)
    }
    return (
<div className="SearchItem">
    <img src={item.photos[0]} alt=""/>
    <div className="SearchItemDescription">
        <span className="ItemTitle">{item.name}</span>
        <span>{item.description}</span>
        <span>{item.city}</span>
        <span>₹{item.price}</span>

        <button className="SearchItemButton" 
        onClick={HandleRent}>Rent</button>
    </div>
</div>
)}

export default SearchItem