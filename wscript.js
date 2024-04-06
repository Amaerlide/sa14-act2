document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    
    
    form.addEventListener("submit", async function(event){
        event.preventDefault();

        const cityInput = document.getElementById("name").value;

        const apiKey = "42aa535f489746119a972823240604"
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityInput}`;

        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error("City not found");
            }

            const weatherData = await response.json();
            console.log(weatherData);

            const weatherInfo = document.createElement("div");
            weatherInfo.innerHTML = `
                <h2>Weather in ${weatherData.location.name}, ${weatherData.location.country}</h2>
                <p>Temperature: ${weatherData.current.temp_c}C</p>
                <p>Condition: ${weatherData.current.condition.text}</p>
            `;

            const weatherInfoContainer = document.getElementById("weatherInfo");
            weatherInfoContainer.innerHTML = ""; // Clear previous content
            weatherInfoContainer.appendChild(weatherInfo);
        }
        catch (error) {
            console.error(error.message);
            const weatherInfo = document.getElementById("weatherInfo");
            weatherInfo.innerHTML = `<p>${error.message}</p>`;
        }

    });
});