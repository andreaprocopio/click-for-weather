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

  function handleSetWeatherCords(lat, lon) {
    setWeatherCords({
      latitude: lat,
      longitude: lon
    })
  }

  return (
    <>
      <div className='react-weather-container max-w-7xl lg:p-20 md:p-10 p-5 m-auto bg-slate-900	'>
        <IntroTitle />
        <Map handleSetWeatherCords={handleSetWeatherCords} weatherCords={weatherCords} /> 
        <CurrentWeather weatherCords={weatherCords} />
      </div>
    </>
  )
}

export default App
