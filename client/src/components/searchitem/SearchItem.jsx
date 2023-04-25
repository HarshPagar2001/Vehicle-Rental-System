import "./SearchItem.css"

const SearchItem = ({item}) => {

    return (
<div className="SearchItem">
    <img src={item.photos[0]} alt=""/>
    <div className="SearchItemDescription">
        <span className="ItemTitle">{item.name}</span>
        <span>{item.description}</span>
        <span>{item.city}</span>
        <span>₹{item.price}</span>

        <button className="SearchItemButton">
        <a href={`/vehicles/${item._id}`}>Rent</a></button>
    </div>
</div>
)}

export default SearchItem