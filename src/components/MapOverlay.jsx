import React from 'react'
import LoadingSpinner from './LoadingSpinner'

const MapOverlay = () => {
  return (
    <div className='react-weather-map__map-overlay 
    absolute inset-0 bg-white 
    bg-opacity-50 z-[1000]
    flex justify-center	items-center'><LoadingSpinner /></div>
  )
}

export default MapOverlay