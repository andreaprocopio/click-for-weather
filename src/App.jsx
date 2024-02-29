import React from 'react'
import './App.scss';
import Map from './components/Map';
import IntroTitle from './components/IntroTitle';
import { useState } from 'react';
import CurrentWeather from './components/CurrentWeather';

const App = () => {

  const [weatherCords, setWeatherCords] = useState({
    latitude: 51.505,
    longitude: -0.09
  })

  const [isNight, setIsNight] = useState(false)

  function handleSetWeatherCords(lat, lon) {
    setWeatherCords({
      latitude: lat,
      longitude: lon
    })
  }

  function handleSetIsNight(value) {
    setIsNight(value)
  }

  return (
    <div className={'h-full ' + (isNight ? 'bg-gradient-to-b from-slate-900 via-gray-600 to-neutral-800' : 'bg-gradient-to-b from-orange-500 via-amber-300 to-yellow-300')}>
      <div className='react-weather-container max-w-5xl md:p-10 p-5 m-auto'>
        <IntroTitle isNight={isNight} />
        <Map handleSetWeatherCords={handleSetWeatherCords} weatherCords={weatherCords} /> 
        <CurrentWeather weatherCords={weatherCords} handleSetIsNight={handleSetIsNight} isNight={isNight}/>
      </div>
    </div>
  )
}

export default App
