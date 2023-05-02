import { useEffect, useState } from "react"
import axios from "axios"

const useFetch =(url) => {
    const [data, setData] =  useState([])

    const [vehicles, setVehicle] =  useState([])
    const [users, setUser] =  useState([])
    const [orders, setOrder] =  useState([])

    const [loading, setLoading] =  useState([false])
    const [error, setError] =  useState([false])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get(url)
                setData(res.data)
                setVehicle(res.data)
                setUser(res.data)
                setOrder(res.data)
            } catch (err) {
                setError(err)
            } setLoading(false)
        }
        fetchData()
    }, [url])

const refetch = async () => {
    setLoading(true)
    try {
        const res = await axios.get(url)
        setData(res.data)
        setVehicle(res.data)
        setUser(res.data)
        setOrder(res.data)
    } catch (err) {
        setError(err)
    } setLoading(false)
}
return {data, vehicles, users, orders, loading, error, refetch}
}

export default useFetch