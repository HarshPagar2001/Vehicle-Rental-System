import "./Home.css"
import Navbar from "../../components/navbar/Navbar"
import HeaderSearch from "../../components/headersearch/HeaderSearch"
import Services from "../../components/services/Services"
import Footer from "../../components/footer/Footer"

const Home = () => {
    return (
        <div>
            <Navbar/>
            <HeaderSearch/>
            <Services/>
            <Footer/>
        </div>
    )
}

export default Home