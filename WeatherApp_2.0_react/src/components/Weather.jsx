import React from 'react'
import { useEffect,useState } from 'react'
import fetchCity from './FetchCity';
import fetchWeatherData from './FetchWeatherData'
import WeatherImg from './WeatherImg';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [Usercity, setUserCity] = useState(null);
    useEffect(()=>{
    fetchWeatherData(setWeatherData);

  }, [])
  useEffect(()=>{
    fetchCity(setUserCity)
  }, [])
  
  
   return (
    <>
     <div className='weatherIMG'>
    
    </div>

     <div className="main_container">
     <h1 className='UserCity'> 
          {Usercity ? `${Usercity.city}`: `Loading city data...` }
        </h1>
        <div className='weatherIMG'>
                {weatherData && <WeatherImg forecast={weatherData.description} />}
        </div>
     <h1 className='Temprature'>
          {weatherData ? `${weatherData.temprature}°C` : `loading temprature...`}
          <p>
            {weatherData ? `${weatherData.description}` : `loading description`}
          </p>
        </h1>
      
     </div>
    <div className='information_panel'>
      <p className='infoitem'> {weatherData ? `${weatherData.wind_speed} m/s`:`loading wind speed...`}</p>
      <p className='infoitem'> {weatherData ? `${weatherData.humidity} %` :`loading humidity...`}</p>
      <p className='infoitem'> {weatherData ? `Feels like ${weatherData.feelslike} °C`:`loading feelslike`}</p>
    </div>
    
    </>
  )
}

export default Weather