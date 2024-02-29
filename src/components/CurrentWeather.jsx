import React from 'react'
import { useState, useEffect } from 'react'
import { WiHumidity } from "react-icons/wi";
import { LuWind } from "react-icons/lu";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import ErrorBanner from './ErrorBanner';


const CurrentWeather = ({weatherCords, handleSetIsNight}) => {

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

    useEffect(() => {
        handleSetIsNight(isNight)
    },[isNight])

    const IMAGE_URLS = `https://openweathermap.org/img/wn/${weatherImageId}@2x.png`

    function handleBannerClose () {
        setError(null)
    }

    if (Object.keys(weather).length === 0) {
        return (
            <div>No weather data</div>
        )
    }
    
    return (
        <>
            {error && <ErrorBanner text={"Please, avoid world tours."} handleBannerClose={handleBannerClose} />}
            <div className={"p-5 shadow-md grid grid-cols-3 gap-4 current-weather rounded-lg mt-4 " + (isNight ? "current-weather--night" : "")}>
                <div><img className='current-weather__img w-[70px] h-[70px] md:w-[96px] md:h-[96px]' src={IMAGE_URLS} alt="icon" /></div>
                <p className={'-ml-5 sm:-ml-0 justify-start sm:justify-center current-weather__city-name text-xl md:text-2xl lg:text-4xl ' + (isNight ? 'text-slate-300' : 'text-slate-800')}>{countryCode}{cityName ? `, ${cityName}` : ''}</p>
                <div></div>
                <div></div>
                <div className={'current-weather__temp text-4xl md:text-5xl lg:text-6xl ' + (isNight ? 'text-slate-300' : 'text-slate-800')}>{weatherTemp ? `${weatherTemp}°` : '--°'}</div>
                <div></div>
                <div></div>
                <div className={'current-weather__description text-sm md:text-base lg:text-lg ' + (isNight ? 'text-slate-300' : 'text-slate-800')}>{weatherDescription}</div>
                <div></div>
                <div className='current-weather__temp-max-min text-sm md:text-base lg:text-lg'>
                    <span className={isNight ? 'text-slate-300' : 'text-slate-800'}>
                        {weatherTempMax ? `${weatherTempMax}°` : '--°'}
                        <FaLongArrowAltUp />
                    </span>
                    <span className={isNight ? 'text-slate-300' : 'text-slate-800'}>
                        {weatherTempMin ? `${weatherTempMin}°` : '--°'}
                        <FaLongArrowAltDown />
                    </span>
                </div>
                <div></div>
                <div className='current-weather__humidity-wind-speed text-sm md:text-base lg:text-lg'>
                    <span className={isNight ? 'text-slate-300' : 'text-slate-800'}>
                        {weatherHumidity}
                        <WiHumidity />
                    </span>
                    <span className={isNight ? 'text-slate-300' : 'text-slate-800'}>
                        {weatherWindSpeed}
                        <LuWind />
                    </span>
                </div>
            </div>
        </>
    )
}

export default CurrentWeather