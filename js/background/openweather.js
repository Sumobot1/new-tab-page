var theJSON;
var OPENWEATHERAPIID;
var openweather = {
    'theWeather': null
};
openweather.gotLocation = function(location){
	if (location.msg === undefined){
    	this.httpGetAsync("http://api.openweathermap.org/data/2.5/weather?"+"lat="+location.latitude.toString()+"&lon="+location.longitude.toString()+"&APPID="+OPENWEATHERAPIID, this.sendResponse.bind(this))
    }
    else{
    	background.sendMessage({requesttype: "cantUpdateWeather", errorMessage: location.msg})
    }
}

openweather.getLocation = function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition.bind(this), this.showError.bind(this));
    } else {
        this.gotLocation({msg: "Geolocation is not supported by this browser."});
    }
}

openweather.showPosition = function(position){
	this.gotLocation({latitude: position.coords.latitude, longitude: position.coords.longitude});
}

openweather.showError = function(error){
	switch (error.code) {
	    case error.PERMISSION_DENIED:
	        this.gotLocation({ msg: "Oops! We can't seem to get your location!  Maybe it needs to be enabled in settings?" });		//USER DENIED REQUEST FOR GEOLOCATION
	        break;
	    case error.POSITION_UNAVAILABLE:
	        this.gotLocation({ msg: "Sorry! Location information is unavailable right now.  We'll keep trying though!" });			//LOCATION INFORMATION CURRENTLY UNAVAILABLE
	        break;
	    case error.TIMEOUT:
	        this.gotLocation({ msg: "Sorry!  The request to get user location timed out.  We'll keep trying though!" });			//LOCATION REQUEST TIMED OUT
	        break;
	    case error.UNKNOWN_ERROR:
	        this.gotLocation({ msg: "An unknown error occurred." });																//UNKNOWN ERROR OCCURRED
	        break;
	}
}

openweather.getCurrentWeather = function() {
    if (openweather.theWeather) {
        openweather.sendResponse(openweather.theWeather);
    }else{
        openweather.getTheCurrentWeather();
    }
}

openweather.getTheCurrentWeather = function() {
    //theJSON = background.theJSON;
    OPENWEATHERAPIID = background.theJSON['OPENWEATHERAPIID'];
    this.getLocation();
}

openweather.httpGetAsync = function(theUrl, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

openweather.sendResponse = function(theWeather){
    openweather.theWeather = theWeather;
    console.log("TIME IN HOURS: " + timeanddate.timeInHours);
    if (timeanddate.timeInHours < 6 || timeanddate.timeInHours > 18)
	   background.sendMessage({requesttype: "updatedWeather", currentWeather: theWeather, dayOrNight: 'night'});
    else
        background.sendMessage({requesttype: "updatedWeather", currentWeather: theWeather, dayOrNight: 'day'});
}