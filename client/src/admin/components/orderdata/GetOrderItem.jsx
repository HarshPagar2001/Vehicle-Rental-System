import axios from "axios"

const GetOrderItem = ({item}) => {

    const Delete = async e => {
        e.preventDefault()
            try {
                await axios.delete(`/order/orders/${item._id}`)
                window.location.reload();
            } catch (error) {
            }
        }

    return (
            <tr>
                <td>{item.paymentid}</td>
                <td>{item.vehicle}</td>
                <td>{item.username}</td>
                <td>
                    <div className="GetOrderButton">
                    <div className="OrderViewButton">
                    <a href={`/admin/dashboard/orders/${item._id}`}>
                    View</a></div>
                    <div className="OrderDeleteButton" onClick={Delete}>Delete
                    </div>
                    </div>
                </td>
            </tr>
)}

export default GetOrderItem