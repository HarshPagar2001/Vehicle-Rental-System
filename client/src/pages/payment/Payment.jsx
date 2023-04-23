import "./Payment.css"
import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer"
import { useContext, useState } from "react"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch"
import { SearchContext } from "../../context/SearchContext"

const Payment = () => {

    const location = useLocation()
    const id = localStorage.getItem("Path")
    const PaymentID = location.pathname.split("/")[3]

    const { data } = useFetch(`/vehicles/vehicle/${id}`)

    console.log(PaymentID)
    console.log(id)

    const Address = document.getElementById("address")
    const Time = document.getElementById("time")

    const navigate = useNavigate()

    const {dates} = useContext(SearchContext)

    const { user } = useContext(AuthContext)

    const [ value, setValue ] = useState("")
    
    const [ error, setError] = useState("")

    const [ credentials, setCredentials] = useState({
        username:undefined,
        vehicle:undefined,
        city:undefined,
        price:undefined,
        time:undefined,
        address:undefined,
    })

    const handleChange = (e) => {setCredentials(prev => ({...prev,
            paymentid: PaymentID,
            username: user.username,
            vehicle: data.name,
            city: data.city,
            price: data.price,
            [e.target.id]: e.target.value}))
        }

    const handlePayment = async e => {
        e.preventDefault()

        if(Address.value === "" && Time.value === ""){
            setValue("Address required")
        }
        else if(Address.value === ""){
            setValue("Address required")
        }
        else if(Time.value === ""){
            setValue("Time required")
        }
        else {
            try {
            await axios.post("/order", credentials)
            } catch (error) {
                setError(error)
            }
        }
        navigate(`/vehicles/payment/${PaymentID}/redirect`)
    }

    return (
        <div>
        <Navbar/>
        <div className="Payment">
            <div className="PaymentContainer">
                <div className="PaymentDetail">
                <div class="UserBox">
                <label>Address</label>
                <input type="text" id="address" 
                onChange={handleChange} required/>
                </div>

                <div class="UserBox">
                <label>Time</label>
                <input type="text" id="time" 
                onChange={handleChange} required/>
                </div>

                {value && <span className="ErrorMessage">{value}</span>}

                {error && <span className="ErrorMessage">{error}</span>}

                <button className="PaymentButton" onClick={handlePayment}>Confirm</button>

                </div>
            </div>
        </div>
        <Footer/>
        </div>
)}

export default Payment