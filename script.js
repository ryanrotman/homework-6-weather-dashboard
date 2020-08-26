// Global variables for needed elements on the page


// Click event for #search-btn
$("#search-btn").on("click", function () {
    event.preventDefault;
    // Set variable for needed elements to build the queryURL
    var apiKey ="a7910a5735249739663f81c42f8319c2";
    var city = $("#search-input").val();
    // console.log the city
    console.log(city);
    // Clear the input field
    $("#search-input").val("");
    // Constructing a url to search openweather for the current weather
    var currentWeatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    // Perform the AJAX GET request for current weather
    $.ajax({
        url: currentWeatherQueryURL,
        method: "GET"
    }).then(function(response) {
        // Console log the response to know how the data is being returned
        console.log(response);
    });
    // Constructing a url to search openweather for the 5-day forecast
    var fiveDayForecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
    // Perform the AJAX GET request for 5-day forecast
    $.ajax({
        url: fiveDayForecastQueryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });
    // Constructing a url to search openweather for the uv index
    // var uvIndexQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + cityLat + "&lon=" + cityLon;
});

/* TODO:
    - finalize which api to use
        - should be able to use the onecall api, but need to figure out how to convert city to lat and lon
*/