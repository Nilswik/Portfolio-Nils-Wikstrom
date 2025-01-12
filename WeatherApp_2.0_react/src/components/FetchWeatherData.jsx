

function fetchWeatherData(setWeatherData, setUserCity){
    const usercity = "stockholm";
    const apiKEY = "16bbe4b7b90bea72c140690f166772ea";
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${usercity}&appid=${apiKEY}`;
    if(!usercity){
        console.log("User city not defined yet ");
        return;
    }
    fetch(apiURL)
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data)
        const RealTemp = data.main.temp - 273.15;
        const feelslike = data.main.feels_like - 273.15;
        console.log(`temprature in ${usercity}: ${RealTemp.toFixed(2)}deg C `)
        setWeatherData({
            temprature  : RealTemp.toFixed(1),
            feelslike   : feelslike.toFixed(1),
            description : data.weather[0].description,
            wind_speed  : data.wind.speed,
            humidity    : data.main.humidity,

        })
        
    })
    .catch((error)=>{
        console.error(error)
    })

}

export default fetchWeatherData