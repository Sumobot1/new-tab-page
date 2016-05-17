define(function(require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    var messages = require('./messages');

    // Load library/vendor modules using
    // full IDs, like:
    /* var print = require('./print');*/
    var hello = messages.getHello();
    console.log(hello);
    messages.printstuff(hello);
    messages.printstuff(messages.getHello());
    document.body.style.background = "red";
    document.getElementById("supportUs").addEventListener("click", function() {
        document.getElementById("supportUs").style.background = "green";
        chrome.runtime.sendMessage({ greeting: "hello" }, function(response) {
            console.log(response.farewell);
        });
    });

    //messages.printstuff(messages.getHello());
});
