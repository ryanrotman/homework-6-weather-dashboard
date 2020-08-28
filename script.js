// Global variables for needed elements on the page
var currentDay = moment().format("l");
console.log("Current Day: " + currentDay);

// Click event for #search-btn
$("#search-btn").on("click", function() {
    event.preventDefault;
    // Set variable for needed elements to build the queryURL
    var apiKeyOpenCage = "1eb9ab07096e4c45b12337969ad43d17"
    var apiKeyOpenWeather ="a7910a5735249739663f81c42f8319c2";
    var city = $("#search-input").val();
    // console.log the city
    console.log("User Search for: " + city);
    // Clear the input field
    $("#search-input").val("");
    // Construct a url to search opencage to get the latitude and longitude coordinates for the city
    var openCageQueryURL = "https://api.opencagedata.com/geocode/v1/json?q=" + city + "&key=" + apiKeyOpenCage;
    // Perform first of two AJAX calls using $.when() to get user inputed city then latitude and longitude settings for weather information
    $.when($.ajax({
        url: openCageQueryURL,
        method: "GET"
    }).then(function(response) {
        console.log("OpenCage Response: ", response)
        // Set cityLatitude based on first AJAX response
        var cityLatitude = response.results[0].geometry.lat;
        console.log("City Latitude: " + cityLatitude);
        // Set cityLongitude based on first AJAX response
        var cityLongitude = response.results[0].geometry.lng;
        console.log("City Longitude: " + cityLongitude);
        // Constructing a url to search openweather for the current weather and forecast with lat and lon from OpenCage response
        var openWeatherQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLatitude + "&lon=" + cityLongitude + "&exclude=minutely,hourly&units=imperial&appid=" + apiKeyOpenWeather;
        // Perform second AJAX call using values from the first response
        $.ajax({
            url: openWeatherQueryURL,
            method: "GET"
        }).then(function(response) {
            console.log("OpenWeather Response: ", response)
            // Set the city, date, and icon for user selected city current weather
            $("#city-name").html(city + " &#40;" + currentDay + "&#41; ");
            // Set the current weather icon for user selected city
            var weatherIcon = $("<img>");
            weatherIcon.attr("src", "https://openweathermap.org/img/wn/" + response.current.weather[0].icon + ".png");
            weatherIcon.attr("alt", response.current.weather[0].description);
            $("#city-name").append(weatherIcon);
            // Set the current temperature for user selected city
            $("#temperature").html(response.current.temp + " &#x2109;");
            // Set the current humidity for user selected city
            $("#humidity").html(response.current.humidity + "&#37;");
            // Set the current wind speed for user selected city
            $("#wind-speed").html(response.current.wind_speed + " MPH");
            // Set the current uv index for user selected city
            $("#uv-index").html(response.current.uvi);
        });
    }));
});

/* TODO:
    - for future development make app more accurate by being able to grab weather info for exact city the user wants
*/