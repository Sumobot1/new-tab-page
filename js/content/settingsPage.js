define(function () {  
        function applySettings(settings) {
            console.log("GOTTA APPLY DEM SETTINGS");
            console.log(settings);
            if (!settings['showRecentlyVisited']){
                console.log("showRecentlyVisited IS FALSE");
                document.getElementById("recentlyVisited").style.display = "none";
                document.getElementById("showRecentlyVisitedCheckbox").checked = false;
            }else{
                document.getElementById("recentlyVisited").style.display = "flex";
                document.getElementById("showRecentlyVisitedCheckbox").checked = true;
            }
            if (!settings['showCurrentTime']){
                console.log("showCurrentTime IS FALSE");
                document.getElementById("mainTime").style.display = "none";
                document.getElementById("showCurrentTimeCheckbox").checked = false;
            }else{
                document.getElementById("mainTime").style.display = "flex";
                document.getElementById("showCurrentTimeCheckbox").checked = true;
            }if (!settings['showQuote']){
                console.log("showQuote IS FALSE");
                document.getElementById("mainQuote").style.display = "none";
                document.getElementById("showQuoteCheckbox").checked = false;
            }else{
                document.getElementById("mainQuote").style.display = "flex";
                document.getElementById("showQuoteCheckbox").checked = true;
            }if (!settings['showGreeting']){
                console.log("showGreeting IS FALSE");
                document.getElementById("mainGreetingWrapper").style.display = "none";
                document.getElementById("showGreetingCheckbox").checked = false;
            }else{
                document.getElementById("mainGreetingWrapper").style.display = "flex";
                document.getElementById("mainGreetingWrapper").style.flexDirection = "column";
                document.getElementById("showGreetingCheckbox").checked = true;
            }if (!settings['enableQuicklaunch']){
                console.log("enableQuicklaunch IS FALSE");
                document.getElementById("hotKeys").style.display = "none";
                document.getElementById("enableQuicklaunchCheckbox").checked = false;
            }else{
                document.getElementById("hotKeys").style.display = "block";
                document.getElementById("enableQuicklaunchCheckbox").checked = true;
            }if (!settings['showCurrentWeather']){
                console.log("showCurrentWeather IS FALSE");
                document.getElementById("currentWeather").style.display = "none";
                document.getElementById("showCurrentWeatherCheckbox").checked = false;
            }else{
                document.getElementById("currentWeather").style.display = "block";
                document.getElementById("showCurrentWeatherCheckbox").checked = true;
            }if (!settings['showNotePad']){
                document.getElementById("toDoList").style.display = "none";
                document.getElementById("showNotePadCheckbox").checked = false;
                if (settings['current-note']){
                    document.getElementById("toDoList").value = settings['current-note'];
                }
            }else{
                document.getElementById("toDoList").style.display = "flex";
                document.getElementById("showNotePadCheckbox").checked = true;
            }
        };
     return {
     	applySettings: applySettings
    };
});

