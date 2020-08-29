// Global variables for needed elements on the page
var currentDay = moment().format("l");
console.log("Current Day: " + currentDay);
var searchedCitiesArray = [];

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
    // Add search to #city-list
    var newCitySearch = $("<div>");
    newCitySearch.addClass("row list-new-city");
    newCitySearch.attr("id", city + "-search");
    newCitySearch.html('<a href="#">' + city + '</a>');
    $("#city-list").append(newCitySearch);
    // Saving search list to local storage
    var searchedCities = {
        "city": city,
    };
    console.log(searchedCities);
    var searchedCityList = JSON.parse(localStorage.getItem("searchedCities"));
    if (searchedCityList == null ) {
        searchedCityList = [];
    }
    searchedCityList.push(searchedCities);
    console.log(searchedCityList);
    localStorage.setItem("searchedCities", JSON.stringify(searchedCityList));
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
            // Set the background color of the current uv index for user selected city
            var currentUVI = Math.floor(response.current.uvi);
            console.log(currentUVI);
            if (currentUVI <= 2) {
                $("#uv-index").css("background-color", "green");
            } else if (currentUVI >= 3 && currentUVI <= 5) {
                $("#uv-index").css("background-color", "yellow");
            } else if (currentUVI == 6 || currentUVI == 7) {
                $("#uv-index").css("background-color", "orange");
            } else if (currentUVI >= 8 && currentUVI <= 10) {
                $("#uv-index").css("background-color", "red");
            } else if (currentUVI >= 11) {
                $("#uv-index").css("background-color", "violet");
            };
            // Add date to forecast cards
            var day1Date = moment().add(1, "days").format("l");
            var day2Date = moment().add(2, "days").format("l");
            var day3Date = moment().add(3, "days").format("l");
            var day4Date = moment().add(4, "days").format("l");
            var day5Date = moment().add(5, "days").format("l");
            $("#day1-date").html(day1Date);
            $("#day2-date").html(day2Date);
            $("#day3-date").html(day3Date);
            $("#day4-date").html(day4Date);
            $("#day5-date").html(day5Date);
            // Add weather icon to forecast cards
            $("#day1-weather-icon").attr("src", "https://openweathermap.org/img/wn/" + response.daily[0].weather[0].icon + ".png");
            $("#day1-weather-icon").attr("alt", response.daily[0].weather[0].description);
            $("#day2-weather-icon").attr("src", "https://openweathermap.org/img/wn/" + response.daily[1].weather[0].icon + ".png");
            $("#day2-weather-icon").attr("alt", response.daily[1].weather[0].description);
            $("#day3-weather-icon").attr("src", "https://openweathermap.org/img/wn/" + response.daily[2].weather[0].icon + ".png");
            $("#day3-weather-icon").attr("alt", response.daily[2].weather[0].description);
            $("#day4-weather-icon").attr("src", "https://openweathermap.org/img/wn/" + response.daily[3].weather[0].icon + ".png");
            $("#day4-weather-icon").attr("alt", response.daily[3].weather[0].description);
            $("#day5-weather-icon").attr("src", "https://openweathermap.org/img/wn/" + response.daily[4].weather[0].icon + ".png");
            $("#day5-weather-icon").attr("alt", response.daily[4].weather[0].description);
            // Add temperature to forecast cards
            $("#day1-temperature").html(response.daily[0].temp.max + " &#x2109;");
            $("#day2-temperature").html(response.daily[1].temp.max + " &#x2109;");
            $("#day3-temperature").html(response.daily[2].temp.max + " &#x2109;");
            $("#day4-temperature").html(response.daily[3].temp.max + " &#x2109;");
            $("#day5-temperature").html(response.daily[4].temp.max + " &#x2109;");
            // Add humidity to forecast cards
            $("#day1-humidity").html(response.daily[0].humidity + "&#37;");
            $("#day2-humidity").html(response.daily[1].humidity + "&#37;");
            $("#day3-humidity").html(response.daily[2].humidity + "&#37;");
            $("#day4-humidity").html(response.daily[3].humidity + "&#37;");
            $("#day5-humidity").html(response.daily[4].humidity + "&#37;");
        });
    }));
});

function showSearchedCities() {
    searchedCitiesArray = JSON.parse(localStorage.getItem("searchedCities"));
    console.log("Searched Cities Array: ", searchedCitiesArray);
    if (searchedCitiesArray != null) {
        for (var i = 0; i < searchedCitiesArray.length; i++) {
            var searchedCity = searchedCitiesArray[i];
            console.log("Selected City from Array: ", searchedCity);
            var citySearched = searchedCity.city;
            $(citySearched + "-search").html('<a href="#">' + citySearched + '</a>');
        };
    };
};

// Call showSearchedCities function
showSearchedCities();

/* TODO:
    - for future development
        - make app more accurate by being able to grab weather info for exact city the user wants
        - adjust code that populate the 5-day forecast cards
            - use loop to populate data?
*/