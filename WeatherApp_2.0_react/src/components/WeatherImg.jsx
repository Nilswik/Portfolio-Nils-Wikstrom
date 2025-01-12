import React from 'react';
import overcastClouds from '../imgs/clodyovercast.png'
import sunny from '../imgs/sun.png'
import snow from '../imgs/snow.png'
import rain from '../imgs/rain.png'

const WeatherImg = ({ forecast }) => {
    const forecastImages = {
        'overcast clouds': overcastClouds,
        'clear sky': sunny,
        'snow': snow,
        'rain': rain,
    };
    const imagePath = forecastImages[forecast] || sunny; // Default to sunny if forecast not found


    return (
        <div>
            <img src={imagePath} alt="Weather Forecast" />
        </div>
    );
};

export default WeatherImg;