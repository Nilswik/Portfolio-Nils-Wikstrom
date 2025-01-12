let usercity = ""; // Declare a global variable to hold the city name

function getUserLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude; // Get latitude
        const lng = position.coords.longitude; // Get longitude
        console.log(lat, lng);
        reversegeocode(lat, lng).then(({ city }) => {
          usercity = city; // Set the global usercity variable
          checkWeather();
        });
      },
      (error) => {
        console.log("error getting this location", error);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser");
  }
}

function reversegeocode(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

  return fetch(url) // Return the fetch promise
    .then((response) => response.json())
    .then((data) => {
      const city =
        data.address.city || data.address.town || data.address.village;
      const country = data.address.country;

      console.log("City:", city);
      console.log("Country:", country);

      return { city, country }; // Return city and country
    })
    .catch((error) => {
      console.error("Error with reverse geocoding:", error);
      throw error; // Rethrow for handling in getUserLocation
    });
}

function checkWeather() {
  const apikey = ""; // not putting my key here :)
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${usercity}&appid=${apikey}`;

  if (!usercity) {
    console.log("User city is not defined yet.");
    return; // Exit if usercity is not set
  }
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector(".City_name").innerHTML = data.name;

      const realTemp = data.main.temp - 273.15;
      document.querySelector(".Temp").innerHTML = Math.round(realTemp) + "°C";
      document.querySelector(".Humidity").innerHTML =
        data.main.humidity + "% humidity";
      document.querySelector(".wind_speed").innerHTML =
        "Wind speed: " + data.wind.speed + " km/h";
      document.querySelector(".description").innerHTML =
        data.weather[0].description;

      const desc = data.weather[0].description;
      updateWeatherImage(desc);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

function updateWeatherImage(description) {
  const weatherimg = document.querySelector(".weatherimg");
  if (!weatherimg) {
    console.log("No img found");
    return; // Exit if no img element exists
  }
  switch (description) {
    case "broken clouds" || "overcast cloud":
      weatherimg.src = "./../images/Broken_cloud.png";
      console.log("Broken clouds");
      break;
    case "overcast clouds":
      weatherimg.src = "./../images/Broken_cloud.png";
      console.log("Broken clouds");
      break;
    case "clear sky":
      weatherimg.src = "./../images/sunny.png";
      console.log("Clear sky");
      break;
    case "cloudy":
      weatherimg.src = "./../images/Cloudy.png";
      console.log("Cloudy");
      break;
    case "rain":
      weatherimg.src = "./../images/rain.png";
      console.log("Rain");
      break;
    default:
      weatherimg.src = "./weatherapp/images/default.png"; // Corrected variable name
      console.log("No image available");
      break;
  }
}

// Initialize the process to get user location and weather data
getUserLocation();
