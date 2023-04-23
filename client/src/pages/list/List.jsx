import "./List.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import SearchItem from "../../components/searchitem/SearchItem";
import useFetch from "../../hooks/useFetch";
import SearchItemLoad from "../../load/searchitemload/SearchItemLoad";


const List = () => {

    //import location and date
    const Location = useLocation()
    const [destination, setDestination] = useState(Location.state.destination)
    const [dates] = useState(Location.state.dates)

    //price useState
    const [min, setMin] = useState(undefined)
    const [max, setMax] = useState(undefined)

    //tab useState
    const [type, setType] = useState("All")

    const { data, loading, refetch } = useFetch(type === "All" ? `/vehicles?city=${destination}&min=${min - 1 || 0}&max=${max + 1 || 800}` : `/vehicles?city=${destination}&type=${type}&min=${min - 1 || 0}&max=${max + 1 || 800}`)

    const handelType = (value) => {
        if(value === 1){
            setType("All")
        }
        else if(value === 2){
            setType("Petrol")
        }
        else if(value === 3){
            setType("Diesel")
        }
        else {
            setType("CNG")
        }
    }

    const handlePrice = () => {
        refetch()
    }

    return (
<div>
<Navbar/>
<div className="List">
    <div className="ListContainer">
        <div className="ListSearch">
            <div className="ListSearchItem">
                <label>Location</label>
                <input type="text" placeholder={destination} onChange={e => setDestination(e.target.value)}/>
            </div>

            <div className="ListSearchItem">
                <label>Date</label>
                <span>{`${format(dates[0].startDate, "dd/MM/yyyy")}`}</span>
            </div>
            <div className="ListSearchItem">
                <span>{`${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
            </div>

            <div className="ListSearchItemOption">
            <label>Price Range</label>
            <div className="ListSearchOption">
                <span className="ListSearchOptionText">
                Minimum Price
                </span>
                <input type="number" onChange={e => setMin
                (e.target.value)}/>
            </div>

            <div className="ListSearchOption">
                <span className="ListSearchOptionText">
                Maximum Price
                </span>
                <input type="number" onChange={e => setMax
                (e.target.value)}/>
            </div>
            </div>

            <div className="SearchButtonContainer">
            <button className="SearchButton" 
            onClick={handlePrice}>Search</button>
            </div>
        </div>
            
        <div className="ListResult">
            <div className="TabSection">
                <div className={type === "All" ? "Tab active" : "Tab"} 
                onClick={() => handelType(1)}>All</div>
                <div className={type === "Petrol" ? "Tab active" : "Tab"} 
                onClick={() => handelType(2)}>Petrol</div>
                <div className={type === "Diesel" ? "Tab active" : "Tab"} 
                onClick={() => handelType(3)}>Diesel</div>
                <div className={type === "CNG" ? "Tab active" : "Tab"} 
                onClick={() => handelType(4)}>CNG</div>
            </div>
            <div className="ListSearchItemContainer">
            {loading ? <SearchItemLoad/> : <>
            {data.map((item) => (
                <SearchItem item={item} key={item._id}/>
            ))}</>} 
            </div>
        </div>
    </div>
</div>
<Footer/>
</div>
)}

export default List