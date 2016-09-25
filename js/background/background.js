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
if (localStorage.getItem("user-settings")){
    console.log("FOUND USER SETTINGS!");
    console.log(localStorage.getItem("user-settings"));
    background.theUserSettings = JSON.parse(localStorage.getItem("user-settings"));
}else{
    console.log("COULD NOT FIND USER SETTINGS");
    loadJSON('user-settings.json', gotUserSettings);
}

function gotAssets(response){
    background.theJSON = JSON.parse(response);
}

function gotUserSettings(response){
    background.theUserSettings = JSON.parse(response);
}

//Chrome message pipe.  Receives messages from content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.requesttype === "ready") {
        chromehistory.getRecentlyVisited(5);
        timeanddate.updateTime();
        openweather.getCurrentWeather(background.theJSON);
        quote.getQuote();
    }else if (request.requesttype === "updateSettings"){
        console.log("SETTING USER SETTINGS NOW");
        background.theUserSettings[request.setting] = request.value;
        console.log(background.theUserSettings);
        localStorage.setItem('user-settings', JSON.stringify(background.theUserSettings));
    }
    if (request.greeting === "hello")
        sendResponse({ farewell: "goodbye" });

});

background.sendMessage = function(message) {
    chrome.tabs.query({}, function(tabs) {      
        for (var i = 0; i < tabs.length; ++i) {
            chrome.tabs.sendMessage(tabs[i].id, message, function(){});
        }
    });
};


 function loadJSON(json, callback) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', json, true); 
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }