define(function(require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    var messages = require('./content/messages');
    var mainTime = require('./content/mainTime');
    var recentlyVisitedSites = require('./content/recentlyVisitedSites');

    // Load library/vendor modules using
    // full IDs, like:
    var hello = messages.getHello();
    //console.log(hello);
    messages.printstuff(hello);
    messages.printstuff(messages.getHello());
    document.getElementById("authorize-button").addEventListener("click", function() {
        document.getElementById("toDoList").style.background = "green";
        chrome.runtime.sendMessage({requesttype: "googleCalender"});
        //handleAuthClick();
    });

/*    document.getElementById("toDoList").addEventListener("click", function() {
        document.getElementById("toDoList").style.background = "green";
        chrome.runtime.sendMessage({ greeting: "hello" }, function(response) {
            console.log(response.farewell);
        });
        
    });*/
    chrome.runtime.sendMessage({requesttype: "ready"}, gotResponse/*function(response){console.log("gotresponse")}*/);
    chrome.runtime.onMessage.addListener(gotResponse);

    function gotResponse(request, sender, sendResponse){
        console.log("gotRequest   ", request);
        if (request != undefined){
                    if (request.requesttype === "updatedTime"){
            mainTime.updateTime(request.newTime, request.newPartOfDay);
        }else if (request.requesttype === "updatedHistory"){
            recentlyVisitedSites.updateSites(request.history);
        }
        }

    }


//     var CLIENT_ID = '1058380813750-ceinta1vu53ntu1m4448unrsjg1cm848.apps.googleusercontent.com';

// // Your Client ID can be retrieved from your project in the Google
//       // Developer Console, https://console.developers.google.com

//       var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

//       /**
//        * Check if current user has authorized this application.
//        */
//       function checkAuth() {
//         gapi.auth.authorize(
//           {
//             'client_id': CLIENT_ID,
//             'scope': SCOPES.join(' '),
//             'immediate': true
//           }, handleAuthResult);
//       }

//       /**
//        * Handle response from authorization server.
//        *
//        * @param {Object} authResult Authorization result.
//        */
//       function handleAuthResult(authResult) {
//         var authorizeDiv = document.getElementById('authorize-div');
//         if (authResult && !authResult.error) {
//           // Hide auth UI, then load client library.
//           authorizeDiv.style.display = 'none';
//           loadCalendarApi();
//         } else {
//           // Show auth UI, allowing the user to initiate authorization by
//           // clicking authorize button.
//           authorizeDiv.style.display = 'inline';
//         }
//       }

//       /**
//        * Initiate auth flow in response to user clicking authorize button.
//        *
//        * @param {Event} event Button click event.
//        */
//       function handleAuthClick() {
//         gapi.auth.authorize(
//           {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
//           handleAuthResult);
//         return false;
//       }

//       *
//        * Load Google Calendar client library. List upcoming events
//        * once client library is loaded.
       
//       function loadCalendarApi() {
//         gapi.client.load('calendar', 'v3', listUpcomingEvents);
//       }

//       /**
//        * Print the summary and start datetime/date of the next ten events in
//        * the authorized user's calendar. If no events are found an
//        * appropriate message is printed.
//        */
//       function listUpcomingEvents() {
//         var request = gapi.client.calendar.events.list({
//           'calendarId': 'primary',
//           'timeMin': (new Date()).toISOString(),
//           'showDeleted': false,
//           'singleEvents': true,
//           'maxResults': 10,
//           'orderBy': 'startTime'
//         });

//         request.execute(function(resp) {
//           var events = resp.items;
//           appendPre('Upcoming events:');

//           if (events.length > 0) {
//             for (i = 0; i < events.length; i++) {
//               var event = events[i];
//               var when = event.start.dateTime;
//               if (!when) {
//                 when = event.start.date;
//               }
//               appendPre(event.summary + ' (' + when + ')')
//             }
//           } else {
//             appendPre('No upcoming events found.');
//           }

//         });
//       }

//       /**
//        * Append a pre element to the body containing the given message
//        * as its text node.
//        *
//        * @param {string} message Text to be placed in pre element.
//        */
//       function appendPre(message) {
//         var pre = document.getElementById('output');
//         var textContent = document.createTextNode(message + '\n');
//         pre.appendChild(textContent);
//       }

});
