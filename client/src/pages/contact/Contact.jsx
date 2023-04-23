import "./Contact.css"
import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer"

const Contact = () => {
    return (
<div>
<Navbar/>
<div className="Contact">
    <div className="ContactContainer">
        <form action="https://formspree.io/f/moqzpnlq" method="POST" 
        className="ContactItemContainer">
            <div className="ContactItem">
                <div className="ContactItemLeft">
                    <input className="ContactInput" type="text" name="Name" placeholder="Name"/>
                    <input className="ContactInput" type="text" name="Email"placeholder="Email"/>
                </div>
                <div className="ContactItemRight">
                    <input className="ContactInput" type="text" name="Phone"placeholder="Phone"/>
                    <input className="ContactInput" type="text" name="Subject"placeholder="Subject"/>
                </div>
            </div>
            <textarea name="Message" placeholder="Message"></textarea>
            <button type="submit" className="ContactButton">Send</button>
        </form>
    </div>
</div>
<Footer/>
</div>
)}

export default Contact