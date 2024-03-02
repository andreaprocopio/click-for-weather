import React from 'react'
import { useSelector } from 'react-redux'

const AppBackground = ({ children }) => {
    let weatherType = useSelector(state => state.weather.weatherType)
    weatherType = weatherType ? weatherType : 'Clear'
    let time = useSelector(state => state.weather.time)
    time = time ? time : 'day'

    weatherType = weatherType.toLowerCase()
    time = time.toLowerCase()

    const className = time + '-' + weatherType

    return (
        <div className={'h-full app-background ' + className} >
            {children}
        </div>
    )
}

export default AppBackground