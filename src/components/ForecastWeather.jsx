import React, { useState, useEffect } from 'react';
import ForecastItem from './ForecastItem';

const ForecastWeather = ({ weatherCords }) => {
    const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API;
    const URL =  `https://api.openweathermap.org/data/2.5/forecast?lat=${weatherCords.latitude}&lon=${weatherCords.longitude}&appid=${API_KEY}&units=metric`;

    const [weather, setWeather] = useState([]);
    const [error, setError] = useState(null);

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
                <div className="flex mt-4 gap-3">
                    {weather.slice(0, 5).map((item, index) => (
                        <ForecastItem key={index} forecastWeather={item} weatherCords={weatherCords} />
                    ))}
                </div>
            )}
        </>
    );
};

export default ForecastWeather;
