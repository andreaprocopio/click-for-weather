import React from 'react'
import './App.scss';
import Map from './components/Map';
import IntroTitle from './components/IntroTitle';

const App = () => {
  return (
    <>
      <div className='react-weather-container max-w-7xl lg:p-20 md:p-10 p-5 m-auto'>
        <IntroTitle />
        <Map /> 
      </div>
    </>
  )
}

export default App
