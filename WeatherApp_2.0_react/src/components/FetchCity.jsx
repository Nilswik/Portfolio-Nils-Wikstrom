function fetchCity(setUserCity) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude; // Correctly get latitude
                const lng = position.coords.longitude; // Correctly get longitude
                console.log(lat, lng);

                const reverseGeocoderURL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
                fetch(reverseGeocoderURL)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data, "DATA ÄR HÄR");

                        // Safely extract city from the response
                        const city = data.address.city || data.address.town || data.address.village;
                        
                        if (city) {
                            setUserCity({
                                lat: lat, // Use the latitude from geolocation
                                lon: lng, // Use the longitude from geolocation
                                city: city, // Set the extracted city
                            });
                            console.log("City set to:", city);
                        } else {
                            console.log("City data not available");
                        }
                    })
                    .catch((error) => {
                        console.error("Error with reverse geocoding:", error.message);
                    });
            },
            (error) => {
                console.log("Error getting location:", error.message);
            }
        );
    } else {
        console.log("Geolocation is not supported by this browser");
    }
}

export default fetchCity;
