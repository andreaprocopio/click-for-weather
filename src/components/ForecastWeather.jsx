import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ForecastWeather = ({weatherCords}) => {

    const API_KEY = "f8106cb232c7ef1f9e975f6539646292"
    // const URL =  `api.openweathermap.org/data/2.5/forecast?lat=${weatherCords.latitude}&lon=${weatherCords.longitude}&appid=${API_KEY}&units=metric`
    const URL = `api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=${API_KEY}`



    const [weather, setWeather] = useState({})
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchWeather () {
            try {
                const res = await fetch(URL);
                const weatherData = await res.text()
                if (!res.ok) {
                    throw new Error
                }
                setError(null)
                setWeather(weatherData)
            } catch(err) {
                console.error(err)
                setError(true)
            }
        }
        fetchWeather()    
    }, [weatherCords])


    return (
        <div>ForecastWeather</div>
    )
}

export default ForecastWeather