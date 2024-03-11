import React, { useState, useEffect } from 'react';
import ForecastItem from './ForecastItem';
import { motion } from 'framer-motion';

const ForecastWeather = ({ weatherCords }) => {
    // const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API;
    const API_KEY = "f8106cb232c7ef1f9e975f6539646292";
    const URL =  `https://api.openweathermap.org/data/2.5/forecast?lat=${weatherCords.latitude}&lon=${weatherCords.longitude}&appid=${API_KEY}&units=metric`;

    const [weather, setWeather] = useState([]);
    const [error, setError] = useState(null);

    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            delayChildren: 0.2,
            staggerChildren: 0.1
          }
        }
      };

    useEffect(() => {
        async function fetchWeather() {
            try {
                const res = await fetch(URL);
                const weatherData = await res.json();
                if (!res.ok) {
                    throw new Error();
                }
                setError(null);
                setWeather(Array.from(weatherData.list));
            } catch(err) {
                console.error(err);
                setError(true);
            }
        }
        fetchWeather();
    }, [weatherCords]);

    return (
        <>
            {weather.length > 0 && (
                <motion.div
                    className="flex flex-row gap-2 mt-8 justify-between"
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    key={weatherCords.latitude + weatherCords.longitude}
                >
                    {weather.slice(0, 4).map((item, index) => (
                        <ForecastItem key={index} forecastWeather={item} weatherCords={weatherCords} />
                    ))}
                </motion.div>
            )}
        </>
    );
};

export default ForecastWeather;
