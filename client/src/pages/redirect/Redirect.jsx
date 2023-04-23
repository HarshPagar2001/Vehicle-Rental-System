import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import  "./Redirect.css";
import { useLocation } from "react-router-dom";

const Redirect = () => {

    const location = useLocation()
    const PaymentId = location.pathname.split("/")[3]
    return (
        <div>
        <Navbar/>
        <div className="Redirect">
            <div className="RedirectContainer">
                <div className="RedirectDetail">
                    <h2>Payment Successful</h2>
                    <label>Payment ID</label>
                    <input type="text" value={PaymentId}/>
                <div className="RedirectButton">
                    <a href="/">Home Page</a></div>
                </div>
            </div>
        </div>
        <Footer/>
        </div>
)}

export default Redirect