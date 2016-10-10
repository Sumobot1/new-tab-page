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
    var user_settings;
    //console.log(hello);
    messages.printstuff(hello);
    messages.printstuff(messages.getHello());
    chrome.runtime.sendMessage({ requesttype: "ready" }, gotResponse);
    chrome.runtime.onMessage.addListener(gotResponse);

    function gotResponse(request, sender, sendResponse) {
        console.log("Response to Request", request);

        if (request === undefined) {
            return;
        }
        if (request.requesttype === "updatedTime") {
            mainTime.updateTime(request.newTime, request.newPartOfDay, request.userName);
        } else if (request.requesttype === "updatedHistory") {
            recentlyVisitedSites.updateSites(request.history);
        } else if (request.requesttype === "updatedWeather") {
            currentWeather.updateWeather(request.currentWeather, request.dayOrNight);
        } else if (request.requesttype === "gotQuote") {
            getQuote.showQuote(request.quote);
        } else if (request.requesttype === "settings") {
            user_settings = request.settings;
            settingsPage.applySettings(request.settings);
        } else if (request.requesttype === "backgroundNum") {
            document.getElementsByTagName("body")[0].style.background = "url('/img/background/bg (" + request.number.toString() + ").jpg') no-repeat center center fixed";
            document.getElementsByTagName("body")[0].style.backgroundSize = "cover";
        }
    }

    function code(e) {
        console.log("e: ");
        console.log(e);
        e = e || window.event;
        return (e.keyCode || e.which);
    }
    // window.onload = function() {
        // console.log("window.onload =================================");
        window.onkeypress = function(e) {
            console.log("DKDFKJAKLFJADLS;JFASJLFAS;LFKJ ==================");
            var key = code(e);
            console.log("KEY: ");
            console.log(key);
            // alert(key);
            for (var i = 0; i < user_settings['launcher-items'].length; i++) {
                if (key === user_settings['launcher-items'][i].key) {
                    if (user_settings['launcher-items'][i].enabled) {
                        chrome.runtime.sendMessage({ requesttype: "openHotKeyTab", site: user_settings['launcher-items'][i].url });
                    }
                }
            }
        };
    // };
});

    function code(e) {
        e = e || window.event;
        return (e.keyCode || e.which);
    }


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
    console.log("saving the thing");
    chrome.runtime.sendMessage({ requesttype: "updateSettings", setting: "current-note", value: toDoList.value });
}

userNameField.onkeypress = function(key) {
    if (code(key) === 13) {
        chrome.runtime.sendMessage({ requesttype: "updateSettings", setting: "user-name", value: userNameField.value });
    }
}

settingsNameField.onkeypress = function(key) {
    if (code(key) === 13) {
        chrome.runtime.sendMessage({ requesttype: "updateSettings", setting: "user-name", value: settingsNameField.value });
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

var twitterEnabledSwitch = document.getElementById("twitterEnabledSwitch");

var twitterHandleField = document.getElementById("twitterHandleField");

var toDoList = document.getElementById("toDoList");

var arBodies = [historySettingsBody, timeSettingsBody, quoteSettingsBody, greetingSettingsBody, launcherSettingsBody, weatherSettingsBody, notepadSettingsBody];
var arHeaders = [historySettingsHeader, timeSettingsHeader, quoteSettingsHeader, greetingSettingsHeader, launcherSettingsHeader, weatherSettingsHeader, notepadSettingsHeader];
var arSettingsCheckboxes = [showRecentlyVisitedCheckbox, showCurrentTimeCheckbox, showQuoteCheckbox, showGreetingCheckbox, enableQuicklaunchCheckbox, showCurrentWeatherCheckbox, showNotePadCheckbox];

window.onload, window.onfocus = function() {
    for (var i = 0; i < arHeaders.length; i++) {
        arHeaders[i].addEventListener('click', function() {
            changeSettingsVisibilityState(this.id);
        }, false)
    }
    for (var i = 0; i < arSettingsCheckboxes.length; i++) {
        arSettingsCheckboxes[i].addEventListener('click', function() {
            changeSettingsElementState(this.id);
        }, false)
    }
}

var timeout;
toDoList.onkeypress = function(key) {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
        console.log("SAVING SHIT");
        chrome.runtime.sendMessage({ requesttype: "updateSettings", setting: "current-note", value: toDoList.value });
    }, 1000);
}

twitterHandleField.onkeypress = function(key) {
    if (code(key) === 13) {
        chrome.runtime.sendMessage({ requesttype: "updateSettings", setting: "twitter-handle", value: twitterHandleField.value });
    }
}

function changeSettingsVisibilityState(id) {
    for (var i = 0; i < arHeaders.length; i++) {
        if (arHeaders[i].id === id) {
            // console.log("here");
            // console.log(arHeaders[i].classList);
            arHeaders[i].classList.add("selected");
            arBodies[i].style.display = "flex";
        } else {
            arHeaders[i].classList.remove("selected");
            arBodies[i].style.display = "none";
        }
    }
    // console.log("ID IS: " + id);
}

function changeSettingsElementState(id) {
    // console.log("id: " + id);
    // console.log(id.replace("Checkbox", ''));
    chrome.runtime.sendMessage({ requesttype: "updateSettings", setting: id.replace("Checkbox", ''), value: document.getElementById(id).checked });
}
