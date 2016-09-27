define(function(require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    var messages = require('./content/messages');
    var mainTime = require('./content/mainTime');
    var currentWeather = require('./content/currentWeather');
    var recentlyVisitedSites = require('./content/recentlyVisitedSites');
    var dailyMessage = require('./content/dailyMessage');
    var getQuote = require('./content/dailyMessage');
    var settingsPage = require('./content/settingsPage');

    // Load library/vendor modules using
    // full IDs, like:
    var hello = messages.getHello();
    //console.log(hello);
    messages.printstuff(hello);
    messages.printstuff(messages.getHello());
   // dailyMessage.getQuote();
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
            mainTime.updateTime(request.newTime, request.newPartOfDay, request.userName);
        }else if (request.requesttype === "updatedHistory"){
            recentlyVisitedSites.updateSites(request.history);
        }else if (request.requesttype === "updatedWeather"){
            currentWeather.updateWeather(request.currentWeather, request.dayOrNight);
        }else if (request.requesttype === "gotQuote"){
            getQuote.showQuote(request.quote);
        }else if (request.requesttype === "settings"){
            settingsPage.applySettings(request.settings);
        }
    }
});


function code(e) {
    e = e || window.event;
    return(e.keyCode || e.which);
}
window.onfocus = function(){
    document.onkeypress = function(e){
        var key = code(e);
        alert(key);
        // do something with key
    };
};

//Modal Stuff
var modal = document.getElementById('settingsModal');

// Get the button that opens the modal
var btn = document.getElementById("settingsGear");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var userNameField = document.getElementById("userNameField");
var settingsNameField = document.getElementById("settingsNameField");

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

userNameField.onkeypress = function(key){
    if (code(key) === 13){
        chrome.runtime.sendMessage({requesttype: "updateSettings", setting: "user-name", value: userNameField.value});
    }
}

settingsNameField.onkeypress = function(key) {
    if (code(key) === 13){
        chrome.runtime.sendMessage({requesttype: "updateSettings", setting: "user-name", value: settingsNameField.value});
    }
}

var historySettingsHeader = document.getElementById("historySettingsHeader");
var timeSettingsHeader = document.getElementById("timeSettingsHeader");
var quoteSettingsHeader = document.getElementById("quoteSettingsHeader");
var greetingSettingsHeader = document.getElementById("greetingSettingsHeader");
var launcherSettingsHeader = document.getElementById("launcherSettingsHeader");
var weatherSettingsHeader = document.getElementById("weatherSettingsHeader");
var notepadSettingsHeader = document.getElementById("notepadSettingsHeader");
var historySettingsBody = document.getElementById("historySettingsBody");
var timeSettingsBody = document.getElementById("timeSettingsBody");
var quoteSettingsBody = document.getElementById("quoteSettingsBody");
var greetingSettingsBody = document.getElementById("greetingSettingsBody");
var launcherSettingsBody = document.getElementById("launcherSettingsBody");
var weatherSettingsBody = document.getElementById("weatherSettingsBody");
var notepadSettingsBody = document.getElementById("notepadSettingsBody");
//
var showRecentlyVisitedCheckbox = document.getElementById("showRecentlyVisitedCheckbox");
var showCurrentTimeCheckbox = document.getElementById("showCurrentTimeCheckbox");
var showQuoteCheckbox = document.getElementById("showQuoteCheckbox");
var showGreetingCheckbox = document.getElementById("showGreetingCheckbox");
var enableQuicklaunchCheckbox = document.getElementById("enableQuicklaunchCheckbox");
var showCurrentWeatherCheckbox = document.getElementById("showCurrentWeatherCheckbox");
var showNotePadCheckbox = document.getElementById("showNotePadCheckbox");

var arBodies = [historySettingsBody, timeSettingsBody, quoteSettingsBody, greetingSettingsBody, launcherSettingsBody, weatherSettingsBody, notepadSettingsBody];
var arHeaders = [historySettingsHeader, timeSettingsHeader, quoteSettingsHeader, greetingSettingsHeader, launcherSettingsHeader, weatherSettingsHeader, notepadSettingsHeader];
var arSettingsCheckboxes = [showRecentlyVisitedCheckbox, showCurrentTimeCheckbox, showQuoteCheckbox, showGreetingCheckbox, enableQuicklaunchCheckbox, showCurrentWeatherCheckbox, showNotePadCheckbox];

window.onfocus = function(){
    for (var i = 0;i < arHeaders.length; i++) {
        arHeaders[i].addEventListener('click',function(){
            changeSettingsVisibilityState(this.id);
        }, false)
    }
    for (var i = 0;i<arSettingsCheckboxes.length;i++){
        arSettingsCheckboxes[i].addEventListener('click', function(){
            changeSettingsElementState(this.id);
        }, false)
    }
}

function changeSettingsVisibilityState(id){
    for (var i = 0;i<arHeaders.length;i++){
        if (arHeaders[i].id === id){
            console.log("here");
            console.log(arHeaders[i].classList);
            arHeaders[i].classList.add("selected");
            arBodies[i].style.display = "flex";
        }else{
            arHeaders[i].classList.remove("selected");
            arBodies[i].style.display = "none";
        }
    }
    console.log("ID IS: "+id);
}

function changeSettingsElementState(id){
    console.log("id: "+id);
    console.log(id.replace("Checkbox", ''));
    chrome.runtime.sendMessage({requesttype: "updateSettings", setting: id.replace("Checkbox", ''), value: document.getElementById(id).checked});
}