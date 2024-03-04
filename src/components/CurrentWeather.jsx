import React from 'react'
import { useState, useEffect } from 'react'
import { WiHumidity } from "react-icons/wi";
import { LuWind } from "react-icons/lu";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import ErrorBanner from './ErrorBanner';
import { useSelector, useDispatch } from 'react-redux'
import { updateWeather } from '../slices/weatherSlice'
import { themeMapping } from '../theme'
import { WiDaySunny } from "react-icons/wi";
import { MdOutlineModeNight } from "react-icons/md";


const CurrentWeather = ({weatherCords}) => {

    const API_KEY = "f8106cb232c7ef1f9e975f6539646292"
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${weatherCords.latitude}&lon=${weatherCords.longitude}&appid=${API_KEY}&units=metric`

    const API_KEY_bgc = "bdc_c26d2c016c2d47cc908de9ac2cef363d"
    const URL_bgc = `https://api-bdc.net/data/timezone-by-location?latitude=-${weatherCords.latitude}&longitude=${weatherCords.longitude}&key=${API_KEY_bgc}`

    const [weather, setWeather] = useState({})
    const [localTime, setLocalTime] = useState(null)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()

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
                setError(true)
            }
        }
        fetchWeather()
    }, [weatherCords])

    useEffect(() => {
        async function fetchLocalTime () {
            try {
                const res = await fetch(URL_bgc);
                const localTimeData = await res.json()
                if (!res.ok) {
                    throw new Error
                }
                setError(null)
                setLocalTime(localTimeData)
            } catch(err) {
                setError(true)
            }
        }
        fetchLocalTime()
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
    const IMAGE_URLS = `https://openweathermap.org/img/wn/${weatherImageId}@2x.png`

    const localTimeString = localTime ? localTime.localTime.split('T')[1].substring(0, 5) : null;

    function handleBannerClose () {
        setError(null)
    }

    let weatherType = useSelector(state => state.weather.weatherType)
    weatherType = weatherType ? weatherType : 'Clear'
    let time = useSelector(state => state.weather.time)
    time = time ? time : 'day'
    let textColor = themeMapping[weatherType][time].textColor

    if (weather) {
        dispatch(updateWeather({
            weatherType: weather.weather ? weather.weather[0].main : '',
            time: weather.weather ? weather.weather[0].icon.endsWith('n') ? 'night' : 'day' : ''
        }))    
    }


    if (Object.keys(weather).length === 0) {
        return (
            <div>No weather data</div>
        )
    }
    
    return (
        <>
            {error && <ErrorBanner text={"Please, avoid world tours."} handleBannerClose={handleBannerClose} />}
            <div className={"p-5 relative shadow-2xl grid grid-cols-3 gap-4 current-weather rounded-lg mt-4 " + (time === 'night' ? "current-weather--night" : "")}>
                { localTimeString && time === 'day' && (
                    <div className={"absolute right-2 top-2 " + (textColor)}>
                        <span className='text-xs pr-1'>{localTimeString}</span>
                        <WiDaySunny size={18} className={textColor} />
                    </div>
                )}
                { localTimeString && time === 'night' && (
                    <div className={"absolute right-2 top-2 " + (textColor)}>
                        <span className='text-xs pr-1'>{localTimeString}</span>
                        <MdOutlineModeNight size={18} className={textColor} />
                    </div>
                )}
                <div><img className='current-weather__img w-[70px] h-[70px] md:w-[96px] md:h-[96px]' src={IMAGE_URLS} alt="icon" /></div>
                <p className={'-ml-5 sm:-ml-0 justify-start sm:justify-center current-weather__city-name text-xl md:text-2xl lg:text-4xl ' + (textColor)}>{countryCode}{cityName ? `, ${cityName}` : ''}</p>
                <div></div>
                <div></div>
                <div className={'current-weather__temp text-4xl md:text-5xl lg:text-6xl ' + (textColor)}>{weatherTemp ? `${weatherTemp}°` : '--°'}</div>
                <div></div>
                <div></div>
                <div className={'current-weather__description text-sm md:text-base lg:text-lg ' + (textColor)}>{weatherDescription}</div>
                <div></div>
                <div className='current-weather__temp-max-min text-sm md:text-base lg:text-lg'>
                    <span className={textColor}>
                        {weatherTempMax ? `${weatherTempMax}°` : '--°'}
                        <FaLongArrowAltUp />
                    </span>
                    <span className={textColor}>
                        {weatherTempMin ? `${weatherTempMin}°` : '--°'}
                        <FaLongArrowAltDown />
                    </span>
                </div>
                <div></div>
                <div className='current-weather__humidity-wind-speed text-sm md:text-base lg:text-lg'>
                    <span className={textColor}>
                        {weatherHumidity}
                        <WiHumidity />
                    </span>
                    <span className={textColor}>
                        {weatherWindSpeed}
                        <LuWind />
                    </span>
                </div>
            </div>
        </>
    )
}

export default CurrentWeather