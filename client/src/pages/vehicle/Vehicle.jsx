import React, { useContext } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./Vehicle.css";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import VehicleLoad from "../../load/vehicleload/VehicleLoad";

const Vehicle = () => {

    const location = useLocation()
    const id = location.pathname.split("/")[2]

    const { data, loading } = useFetch(`/vehicles/vehicle/${id}`)

    const { user } = useContext(AuthContext)

    const navigate = useNavigate()

    const DateStart = localStorage.getItem("DateStart")
    const DateEnd = localStorage.getItem("DateEnd")

    const StartDate = DateStart
    const EndDate = DateEnd

    const Period = (EndDate - StartDate) + 1

    const GST = data.price * Period * 12 / 100
    const TotalAmount = data.price * Period + GST

    const handleClick = async () => {
        if (user) {
            localStorage.setItem("Path", id)
            const order = await axios.post("/payment/checkout", 
            {amount: TotalAmount})

            const options = {
                key: "rzp_test_VvGXZGTbnO5RYg", // Enter the Key ID generated from the Dashboard
                amount: TotalAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: user.username,
                order_id: order, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                callback_url: "/payment/checkout/paymentverification",
                prefill: {
                    "name": user.username,
                    "email": user.email,
                    "contact": user.phone
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#0096FF"
                }
            };
            const razor = new window.Razorpay(options);
            razor.open();
        } else {
            navigate("/login")
        }
    }


    return (
        <div>
            <Navbar />
            <div className="Vehicle">
                <div className="VehicleMainContainer">
                    <div className="VehicleContainer">
                        {loading ? (<VehicleLoad />) :
                            (<div className="VehicleInformation">
                                <div className="VehicleDetails">
                                    <img src={data.photos} alt="" />
                                    <div className="VehicleDetailsItems">
                                        <span>{data.name}</span>
                                        <span>{data.description}</span>
                                        <span>{data.type}</span>
                                        <span>{data.city}</span>
                                    </div>
                                </div>

                                <div className="VehiclePriceDetail">
                                    <h2>Payment Details</h2>
                                    <div className="PriceDetails">
                                        <div className="PriceDetail">
                                            <span>Price</span>
                                            <span>Rent Period</span>
                                            <span>Total Amount</span>
                                            <span>(GST included)</span>
                                        </div>

                                        <div className="AmountDetail">
                                            <span>₹{data.price}</span>
                                            {(Period > 1) ? (<span>{Period} Days</span>) : (<span>{Period} Day</span>)}
                                            <span>₹{TotalAmount}</span>
                                        </div>
                                    </div>
                                    <div className="VehicleButtonContainer">
                                        <div className="VehicleButton" onClick={handleClick}>Rent Now</div>
                                    </div>
                                </div>
                            </div>)}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Vehicle