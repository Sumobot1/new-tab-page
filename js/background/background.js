//Open new tab when extension button clicked
var background = {
    theJSON: null,
    theUserSettings: null
};

chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.create({ 'url': "chrome://newtab" });
});

var newTabs = [];


loadJSON('assets.json', gotAssets);
if (localStorage.getItem("user-settings")) {
    console.log("FOUND USER SETTINGS!");
    console.log(localStorage.getItem("user-settings"));
    background.theUserSettings = JSON.parse(localStorage.getItem("user-settings"));
} else {
    console.log("COULD NOT FIND USER SETTINGS");
    loadJSON('user-settings.json', gotUserSettings);
    console.log(background.theUserSettings);
}

function gotAssets(response) {
    background.theJSON = JSON.parse(response);
}

function gotUserSettings(response) {
    background.theUserSettings = JSON.parse(response);
}

//Chrome message pipe.  Receives messages from content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.requesttype === "ready") {
        if (background.theUserSettings["showRecentlyVisited"]) {
            chromehistory.getRecentlyVisited();
        }
        if (background.theUserSettings["showCurrentTime"]) {
            timeanddate.updateTime();
        }
        if (background.theUserSettings["showQuote"]) {
            quote.getQuote();
        }
        if (background.theUserSettings["showCurrentWeather"]) {
            openweather.getCurrentWeather();
        }
        background.sendMessage({ requesttype: "settings", settings: background.theUserSettings });
        backgroundimage.showBackgroundImage();
    } else if (request.requesttype === "updateSettings") {
        if (request.setting === "launcher-items") {
            console.log("REQUEST");
            console.log(request);
            console.log(background.theUserSettings[request.setting][request.index]);
            console.log(background.theUserSettings[request.setting][request.index][request.attribute]);
            background.theUserSettings[request.setting][parseInt(request.index)][request.attribute] = request.value;
        } else {
            console.log("SETTING USER SETTINGS NOW");
            background.theUserSettings[request.setting] = request.value;
        }
        console.log(background.theUserSettings);
        localStorage.setItem('user-settings', JSON.stringify(background.theUserSettings));
        background.sendMessage({ requesttype: "settings", settings: background.theUserSettings });
        background.forceUpdate();
    } else if (request.requesttype === "openHotKeyTab"){
        console.log("OPEN HOTKEY TAB SAKJDFAKLDFJLDKJAFLAKJFLKAJDFLKDJAFF");
        chrome.tabs.create({'url': request.site, 'active': false});
    }
    if (request.greeting === "hello")
        sendResponse({ farewell: "goodbye" });

});

background.sendMessage = function(message) {
    chrome.tabs.query({}, function(tabs) {
        for (var i = 0; i < tabs.length; ++i) {
            chrome.tabs.sendMessage(tabs[i].id, message, function() {});
        }
    });
};

background.forceUpdate = function() {
    console.log("background.forceUpdate");
    if (background.theUserSettings["showRecentlyVisited"]) {
        chromehistory.getRecentlyVisitedSites(5);
    }
    if (background.theUserSettings["showQuote"]) {
        quote.getTheQuote();
    }
    if (background.theUserSettings["showCurrentWeather"]) {
        openweather.getTheCurrentWeather();
    }
    if (background.theUserSettings["showCurrentTime"]) {
        timeanddate.updateTime();
    }
};

background.forceFullUpdate = function() {
    console.log("background.forceFullUpdate");
    if (background.theUserSettings["showRecentlyVisited"]) {
        chromehistory.getRecentlyVisitedSites(5);
    }
    if (background.theUserSettings["showQuote"]) {
        quote.getTheQuote();
    }
    if (background.theUserSettings["showCurrentWeather"]) {
        openweather.getTheCurrentWeather();
    }
    backgroundimage.showTheBackgroundImage();
};

function loadJSON(json, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', json, true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}
