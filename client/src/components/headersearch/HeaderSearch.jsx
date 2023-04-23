import "./HeaderSearch.css"
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faCalendar } from "@fortawesome/free-solid-svg-icons"
import { DateRange } from "react-date-range"
import { useContext, useState } from "react"
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"
import { SearchContext } from "../../context/SearchContext"

const HeaderSearch = () => {

    //destination
    const [destination, setDestination] = useState ("")

    //toggle date menu useState
    const [openDate, setOpenDate] = useState (false)

    //date useState
    const [dates, setDates] = useState ([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ])

    //context api
    const {dispatch} = useContext(SearchContext)

    //react router dom navigate
    const Navigate = useNavigate()

    const HandleSearch = () => {
        dispatch({type:"NewSearch", payload:{destination, dates}})
        Navigate("/vehicles", {state:{destination, dates}})
    }

    return (
        
<div className="HeaderSearch">
<div className="HomeTitle">
    <span>Best Rental Vehicles</span>
    <p>Rent the best vehicles and begin your travel journey</p>
</div>

    <div className="HeaderSearchContainer">
        <div className="HeaderSearchItemContainer">
        <div className="HeaderSearchItem">
        <FontAwesomeIcon icon={faSearch} className="Icon"/>
        <input type="text" placeholder="Location" className="HeaderSearchInput"
        onChange={e => setDestination(e.target.value)}/>
        </div>

        <div className="HeaderSearchItem">
        <span className="Label">Start</span>
        <div className="HeaderSearchComponent">
        <FontAwesomeIcon icon={faCalendar} className="Icon"/>
        <span className="HeaderSearchText">{`${format(dates[0].startDate, "dd/MM/yyyy")}`}</span>
        </div>
        </div>

        <div className="HeaderSearchItem">
        <span className="Label">End</span>
        <div className="HeaderSearchComponent">
        <FontAwesomeIcon icon={faCalendar} className="Icon"/>
        <span className="HeaderSearchText">{`${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
        </div>
        </div>

        {openDate &&<DateRange className="DateRange"
        editableDateInputs={true}
        onChange={(item) => setDates([item.selection])}
        moveRangeOnFirstSelection={false}
        minDate={new Date()}
        ranges={dates}/>}

        <div className="HeaderSearchItem">
            <button onClick={() => (setOpenDate(!openDate))} className="SelectDate">Select Date</button>
        </div>
    </div>
        <button onClick={HandleSearch} className="HeaderButton">Search</button>
    </div>
</div>
)}

export default HeaderSearch