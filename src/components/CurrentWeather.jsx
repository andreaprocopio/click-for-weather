import React from 'react'
import { useState, useEffect } from 'react'
import { WiHumidity } from "react-icons/wi";
import { LuWind } from "react-icons/lu";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import ErrorBanner from './ErrorBanner';


const CurrentWeather = ({weatherCords}) => {

    const API_KEY = "f8106cb232c7ef1f9e975f6539646292"
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${weatherCords.latitude}&lon=${weatherCords.longitude}&appid=${API_KEY}&units=metric`

    const [weather, setWeather] = useState({})
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchWeather () {
            try {
                const res = await fetch(URL);
                const weatherData = await res.json()
                if (!res.ok) {
                    throw new Error
                }
                setError(null)
                setWeather(weatherData)
            } catch(err) {
                console.log("catched")
                setError(true)
            }
        }
        fetchWeather()
    }, [weatherCords])

    if (Object.keys(weather).length === 0) {
        return (
            <div>No weather data</div>
        )
    }

    const cityName = weather.name ? weather.name : ''
    const weatherDescription = weather.weather ? weather.weather[0].description : ''
    const weatherImageId = weather.weather ? weather.weather[0].icon : ''
    const weatherTemp = weather.main ? weather.main.temp : ''
    const weatherTempMin = weather.main ? weather.main.temp_min : ''
    const weatherTempMax = weather.main ? weather.main.temp_max : ''
    const weatherHumidity = weather.main ?  weather.main.humidity : ''
    const weatherWindSpeed = weather.wind ? weather.wind.speed : ''
    const countryCode = weather.sys ? weather.sys.country : ''
    const isNight = weatherImageId.endsWith('n')

    const IMAGE_URLS = `https://openweathermap.org/img/wn/${weatherImageId}@2x.png`

    function handleBannerClose () {
        setError(null)
    }
    
    return (
        <>
            {error && <ErrorBanner text={"Please, avoid world tours."} handleBannerClose={handleBannerClose} />}
            <div className={"shadow-md grid grid-cols-3 gap-4 current-weather rounded-lg mt-4 " + (isNight ? "current-weather--night" : "")}>
                <img className='current-weather__img' src={IMAGE_URLS} alt="icon" />
                <p className='current-weather__city-name text-xl'>{countryCode}{cityName ? `, ${cityName}` : ''}</p>
                <div></div>
                <div></div>
                <div className='current-weather__temp'>{weatherTemp ? `${weatherTemp}°` : '--°'}</div>
                <div></div>
                <div></div>
                <div className='current-weather__description'>{weatherDescription}</div>
                <div></div>
                <div className='current-weather__temp-max-min'>
                    <span className='text-slate-300'>
                        {weatherTempMax ? `${weatherTempMax}°` : '--°'}
                        <FaLongArrowAltUp />
                    </span>
                    <span className='text-slate-300'>
                        {weatherTempMin ? `${weatherTempMin}°` : '--°'}
                        <FaLongArrowAltDown />
                    </span>
                </div>
                <div></div>
                <div className='current-weather__humidity-wind-speed'>
                    <span className='text-slate-300'>
                        {weatherHumidity}
                        <WiHumidity />
                    </span>
                    <span className='text-slate-300'>
                        {weatherWindSpeed}
                        <LuWind />
                    </span>
                </div>
            </div>
        </>
    )
}

export default CurrentWeather