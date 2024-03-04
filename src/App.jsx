import React from 'react'
import './App.scss';
import Map from './components/Map';
import IntroTitle from './components/IntroTitle';
import { useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import store from './store';
import { Provider } from 'react-redux';
import AppBackground from './components/AppBackground';
import ForecastWeather from './components/ForecastWeather';

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
    <Provider store={store}>
      <AppBackground>
        <div className='react-weather-container max-w-5xl md:p-10 p-5 m-auto'>
          <IntroTitle />
          <Map handleSetWeatherCords={handleSetWeatherCords} weatherCords={weatherCords} /> 
          <CurrentWeather weatherCords={weatherCords} />
          <ForecastWeather weatherCords={weatherCords} />
        </div>
      </AppBackground>
    </Provider>
  )
}

export default App
