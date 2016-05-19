//Open new tab when extension button clicked
chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.create({ 'url': "chrome://newtab" });
});

//Chrome message pipe.  Receives messages from content script
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
        console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
        if (request.requesttype = "ready"){
        	console.log("here");
        	var recent = chromehistory.getRecentlyVisited(5);
        }
        if (request.greeting == "hello")
            sendResponse({ farewell: "goodbye" });
    });

