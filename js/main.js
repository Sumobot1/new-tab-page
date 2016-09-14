define(function(require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    var messages = require('./content/messages');
    var mainTime = require('./content/mainTime');
    //var currentLocation = require('./content/currentLocation');
    var recentlyVisitedSites = require('./content/recentlyVisitedSites');

    // Load library/vendor modules using
    // full IDs, like:
    var hello = messages.getHello();
    //console.log(hello);
    messages.printstuff(hello);
    messages.printstuff(messages.getHello());
   // currentLocation.getLocation();
/*    document.getElementById("toDoList").addEventListener("click", function() {
        document.getElementById("toDoList").style.background = "green";
        chrome.runtime.sendMessage({ greeting: "hello" }, function(response) {
            console.log(response.farewell);
        });
        
    });*/
    chrome.runtime.sendMessage({requesttype: "ready"}, gotResponse/*function(response){console.log("gotresponse")}*/);
    chrome.runtime.onMessage.addListener(gotResponse);

    function gotResponse(request, sender, sendResponse){
        console.log("Response to Request", request);
        if (request === undefined){
            return;
        }
        if (request.requesttype === "updatedTime"){
            mainTime.updateTime(request.newTime, request.newPartOfDay);
        }else if (request.requesttype === "updatedHistory"){
            recentlyVisitedSites.updateSites(request.history);
        }else if (request.requesttype === "updatedWeather"){
            console.log("gotWeather: ");
            console.log(request.currentWeather);
        }
    }
});
