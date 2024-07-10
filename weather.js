document.addEventListener("DOMContentLoaded", () => {
    const eventForm = document.querySelector("#event");
    const cityInput = document.querySelector("#total");

    eventForm.addEventListener("submit", addElement);

    function addElement(event) {
        event.preventDefault();
        const city = cityInput.value.trim();

        if (city === "") {
            alert("Please enter a city name.");
            return;
        }

        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=73794df400ab31b4a026dd6a3381a35b`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Geolocation data not available");
                }
                return response.json();
            })
            .then((geoData) => {
                if (geoData.length === 0) {
                    throw new Error("No data found for the specified city");
                }

                const { lat, lon } = geoData[0];
                return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=73794df400ab31b4a026dd6a3381a35b&units=imperial`);
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Weather data not available");
                }
                return response.json();
            })
            .then((weatherData) => {
                const list = document.querySelector("#list");
                const newElement = document.createElement("li");
                newElement.textContent = `Temp in ${weatherData.name}: ${weatherData.main.temp} °F`;
                list.appendChild(newElement);
            })
            .catch((error) => {
                console.error(error);
                alert(error.message);
            });
    }
});