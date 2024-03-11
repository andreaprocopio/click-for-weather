import React from 'react'
import { themeMapping } from '../theme';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const ForecastItem = ({ forecastWeather }) => {

    const dateString = forecastWeather.dt_txt;
    const dateParts = dateString.split(' ')[0].split('-');
    const formattedDate = dateParts[1] + '/' + dateParts[2];
    const weatherImageId = forecastWeather.weather ? forecastWeather.weather[0].icon : ''
    const IMAGE_URLS = `https://openweathermap.org/img/wn/${weatherImageId}@2x.png`
    const timeFormatted = dateString.split(" ")[1].split(":").slice(0, 2).join(":");
    const forecastItemTemp = forecastWeather.main.temp
    let time = useSelector(state => state.weather.time)
    time = time ? time : 'day'
    let backgroundColor = themeMapping[time].forecastItemBg
    let textColor = themeMapping[time].textColor
    const item = {
        hidden: { y: 10, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1
        }
    };

    return (
        <motion.div
            className={"flex flex-col rounded-lg p-2 justify-center items-center " + (backgroundColor)}
            variants={item}
        >
            <img className='current-weather__img w-[50px] h-[50px] md:w-[60px] md:h-[60px]' src={IMAGE_URLS} alt="icon" />
            <div className="text-center">
                <strong className={"text-base " + (textColor)}>{forecastItemTemp ? `${forecastItemTemp}°` : '--°'}</strong>
                <br />
                <b className={"font-normal text-xs md:text-base lg:text-lg " + (textColor)}>{timeFormatted}</b>
            </div>
        </motion.div>
    )
}

export default ForecastItem