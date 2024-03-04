import React from 'react'

const ForecastItem = ({ forecastWeather }) => {

    const dateString = forecastWeather.dt_txt;
    const dateParts = dateString.split(' ')[0].split('-');
    const formattedDate = dateParts[1] + '/' + dateParts[2];
    const weatherImageId = forecastWeather.weather ? forecastWeather.weather[0].icon : ''
    const IMAGE_URLS = `https://openweathermap.org/img/wn/${weatherImageId}@2x.png`
    const timeFormatted = dateString.split(" ")[1].split(":").slice(0, 2).join(":");

    return (
        <div className={'shadow-2xl grow flex flex-col justify-center items-center rounded-lg pt-2 border-2 border-slate-950 border-solid'} >
            <span className='text-center text-xs text-white md:text-base lg:text-lg'>{formattedDate}</span>
            <img className='current-weather__img w-[50px] h-[50px] md:w-[60px] md:h-[60px]' src={IMAGE_URLS} alt="icon" />
            <span className='text-center text-xs text-white md:text-base lg:text-lg'>{timeFormatted}</span>
        </div>
    )
}

export default ForecastItem