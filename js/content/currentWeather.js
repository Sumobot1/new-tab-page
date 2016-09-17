define(function () {   
        var sImg;
        function updateWeather(currentWeather, dayOrNight) {
            currentWeather = JSON.parse(currentWeather);
                        console.log("currentWeather: "+currentWeather);
            console.log(currentWeather.weather);
            console.log(currentWeather.weather[0].main) //clear, descrition: clear sky
            console.log(currentWeather.main);
            console.log(currentWeather.name);   //Kitchener
            if (dayOrNight === "day"){
                if (currentWeather.weather[0].main === "Clear"){
                    sImg = '<img src="img/sun.png" class="weatherIcon"/>';
                }
            }else{
                if (currentWeather.weather[0].main === "Clear"){
                    sImg = '<img src="img/moon.png" class="weatherIcon"/>';
                }
            }

            document.getElementById("currentWeather").innerHTML = sImg+'<div class="weatherText">'+currentWeather.weather[0].description+'</div>'+'<div class="weatherText">'+currentWeather.name+'</div>';
        };
     return {
     	updateWeather: updateWeather
    };
});
