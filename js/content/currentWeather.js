define(function () {   
        var sImg;
        function updateWeather(currentWeather, dayOrNight) {
            currentWeather = JSON.parse(currentWeather);
            if (dayOrNight === "day"){
                if (currentWeather.weather[0].main === "Clear"){
                    sImg = '<img src="img/sun.png" class="weatherIcon"/>';
                }else if (currentWeather.weather[0].main === "Clouds"){
                    sImg = '<img src="img/partly-cloudy.png" class="weatherIcon"/>'
                }else if (currentWeather.weather[0].main === "Mist"){
                    sImg = '<img src="img/fog-day.png" class="weatherIcon"/>'
                }
            }else{
                if (currentWeather.weather[0].main === "Clear"){
                    sImg = '<img src="img/moon.png" class="weatherIcon"/>';
                }else if (currentWeather.weather[0].main === "Clouds"){
                    sImg = '<img src="img/partly-cloudy-night.png" class="weatherIcon"/>';
                }else if (currentWeather.weather[0].main === "Mist"){
                    sImg = '<img src="img/fog-night.png" class="weatherIcon"/>'
                }
            }
            if (currentWeather.weather[0].main === "Rain"){
                sImg = '<img src="img/rain.png" class="weatherIcon"/>'
            }
            document.getElementById("currentWeather").innerHTML = sImg+'<div class="weatherText">'+currentWeather.weather[0].description+'</div>'+'<div class="weatherText">'+currentWeather.name+'</div>'+'<div class="weatherText">'+String(parseInt(currentWeather.main.temp-273))+'&deg;'+'</div>';
        };
     return {
     	updateWeather: updateWeather
    };
});
