import React from 'react'
import './App.scss';
import Map from './components/Map';
import { useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import ForecastWeather from './components/ForecastWeather';
import { themeMapping } from './theme';
import { useSelector } from 'react-redux';

const App = () => {
  const [weatherCords, setWeatherCords] = useState({
    latitude: 51.505,
    longitude: -0.09
  })

  function handleSetWeatherCords(lat, lon) {
    setWeatherCords({
      latitude: lat,
      longitude: lon
    })
  }

  let time = useSelector(state => state.weather.time)
  time = time ? time : 'day'
  let backgroundColor = themeMapping[time].backgroundColor

  return (
    <div className='min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 py-5'>
      <div className={"rounded-xl shadow-lg overflow-hidden " + (backgroundColor)} style={{ width: 414 }}>
        <Map handleSetWeatherCords={handleSetWeatherCords} weatherCords={weatherCords} /> 
        <div className={"rounded-t-lg relative z-10 px-5 pt-2 pb-5 " + (backgroundColor)}>
          <div className="w-10 h-1 bg-gray-500 rounded mx-auto mb-5" />
          <CurrentWeather weatherCords={weatherCords} />
          <ForecastWeather weatherCords={weatherCords} />
        </div>
      </div>
    </div>
  )
}

export default App
