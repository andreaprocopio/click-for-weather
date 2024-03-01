import React from 'react'
import { useSelector } from 'react-redux'
import { themeMapping } from '../theme'

const AppBackground = ({ children }) => {
    let weatherType = useSelector(state => state.weather.weatherType)
    weatherType = weatherType ? weatherType : 'Clear'
    let time = useSelector(state => state.weather.time)
    time = time ? time : 'day'
    let bgColor = themeMapping[weatherType][time].backgroundGradient

    console.log(weatherType)
    console.log(time)

    return (
        <div className={'h-full ' + (bgColor)} >
            {children}
        </div>
    )
}

export default AppBackground