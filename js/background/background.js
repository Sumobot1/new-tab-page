//Open new tab when extension button clicked
chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.create({ 'url': "chrome://newtab" });
});

var newTabs = [];
var theJSON;

//Chrome message pipe.  Receives messages from content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.requesttype === "ready") {
        loadJSON(function(response){
            theJSON = JSON.parse(response);
            chromehistory.getRecentlyVisited(5);
            timeanddate.updateTime();
            openweather.getCurrentWeather(theJSON);
            quote.getQuote();
        });

    }
    if (request.greeting === "hello")
        sendResponse({ farewell: "goodbye" });

});


var background = {

};

background.sendMessage = function(message) {
    chrome.tabs.query({}, function(tabs) {      
        for (var i = 0; i < tabs.length; ++i) {
            chrome.tabs.sendMessage(tabs[i].id, message, function(){});
        }
    });
};


 function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'assets.json', true); 
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }