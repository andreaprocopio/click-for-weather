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
        <div className={'min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 py-5'} >
            {children}
        </div>
    )
}

export default AppBackground