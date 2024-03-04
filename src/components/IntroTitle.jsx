import React from 'react'
import { useSelector } from 'react-redux'
import { themeMapping } from '../theme'

const IntroTitle = () => {

  let weatherType = useSelector(state => state.weather.weatherType)
  weatherType = weatherType ? weatherType : 'Clear'
  let time = useSelector(state => state.weather.time)
  time = time ? time : 'day'
  let textColor = themeMapping[weatherType][time].textColor

  return (
    <>
        <h1 className={"mb-6 text-3xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-center " + textColor}>Click for weather!</h1>
    </>
  )
}

export default IntroTitle