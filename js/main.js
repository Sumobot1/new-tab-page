define(function(require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    var messages = require('./content/messages');
    var mainTime = require('./content/mainTime');
    var recentlyVisitedSites = require('./content/recentlyVisitedSites');

    // Load library/vendor modules using
    // full IDs, like:
    /* var print = require('./print');*/
    var hello = messages.getHello();
    console.log(hello);
    messages.printstuff(hello);
    messages.printstuff(messages.getHello());
    //document.body.style.background = "red";
    document.getElementById("toDoList").addEventListener("click", function() {
        document.getElementById("toDoList").style.background = "green";
        chrome.runtime.sendMessage({ greeting: "hello" }, function(response) {
            console.log(response.farewell);
        });
        chrome.runtime.sendMessage({requesttype: "ready"}, function(response){console.log("gotresponse")});
    });

    //messages.printstuff(messages.getHello());

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        console.log("gotMessage: ", request);
        if (request.requesttype === "updatedTime"){
            mainTime.updateTime(request.newTime);
        }else if (request.requesttype === "updatedHistory"){
            recentlyVisitedSites.updateSites(request.history);
        }
    });
});
