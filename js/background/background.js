//Open new tab when extension button clicked
chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.create({ 'url': "chrome://newtab" });
});

var newTabs = [];

//Chrome message pipe.  Receives messages from content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.requesttype = "ready") {
        console.log("here");
        var recent = chromehistory.getRecentlyVisited(5);
        console.log("Recent: ", recent);
        timeanddate.updateTime();
    }
    if (request.greeting == "hello")
        sendResponse({ farewell: "goodbye" });
    //sendResponse({ farewell: "goodbye" });
});


var background = {

};

background.sendMessage = function(message) {
    chrome.tabs.query({}, function(tabs) {      /*url:"*kbmnnahabbcbiekkdfjkldccogjmplhi*"*/
        for (var i = 0; i < tabs.length; ++i) {
            chrome.tabs.sendMessage(tabs[i].id, message, function(){});
        }
    });
};
