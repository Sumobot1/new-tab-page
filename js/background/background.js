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
    background.theUserSettings = JSON.parse(localStorage.getItem("user-settings"));
} else {
    loadJSON('user-settings.json', gotUserSettings);
}

function gotAssets(response) {
    background.theJSON = JSON.parse(response);
}

function gotUserSettings(response) {
    background.theUserSettings = JSON.parse(response);
}

//Chrome message pipe.  Receives messages from content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.requesttype === "ready") {
        background.sendMessage({ requesttype: "settings", settings: background.theUserSettings });
        backgroundimage.showBackgroundImage();
        background.forceUpdate();
    } else if (request.requesttype === "updateSettings") {
        if (request.setting === "launcher-items") {
            background.theUserSettings[request.setting][parseInt(request.index)][request.attribute] = request.value;
        } else if (request.setting === "quote-from-twitter" || request.setting === "twitter-handle"){
            background.theUserSettings[request.setting] = request.value;
            quote.getQuote();
        } else if (request.setting === "user-name"){
            background.theUserSettings[request.setting] = request.value;
            timeanddate.updateTime();
        }else {
            background.theUserSettings[request.setting] = request.value;
        }
        localStorage.setItem('user-settings', JSON.stringify(background.theUserSettings));
        background.sendMessage({ requesttype: "settings", settings: background.theUserSettings });
    } else if (request.requesttype === "openHotKeyTab"){
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
    if (background.theUserSettings["showCurrentTime"]) {
        timeanddate.updateTime();
    }
    if (background.theUserSettings["showRecentlyVisited"]) {
        chromehistory.getRecentlyVisitedSites(5);
    }
    if (background.theUserSettings["showQuote"]){
        quote.getTheQuote();
    }
    if (background.theUserSettings["showCurrentWeather"]) {
        openweather.getTheCurrentWeather();
    }
};

background.forceFullUpdate = function() {
    if (background.theUserSettings["showRecentlyVisited"]) {
        chromehistory.getRecentlyVisitedSites(5);
    }
    if (background.theUserSettings["showQuote"] && background.theUserSettings['quote-from-twitter']) {//) {
        quote.getTheQuote();
    }
    if (background.theUserSettings["showCurrentWeather"]) {
        openweather.getTheCurrentWeather();
    }    
    if (background.theUserSettings["showCurrentTime"]) {
        timeanddate.updateTime();
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
