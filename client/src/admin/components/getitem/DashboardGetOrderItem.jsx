const DashboardGetOrderItem = ({item}) => {

    return (
        <tr>
            <td>{item.paymentid}</td>
            <td>{item.vehicle}</td>
            <td>{item.username}</td>
            <td>{item.city}</td>
        </tr>
)}

export default DashboardGetOrderItem