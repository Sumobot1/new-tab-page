define(function() {
    var hasBeenAdded = false;
    function applySettings(settings) {
        console.log(settings);
        if (!settings['showRecentlyVisited']) {
            document.getElementById("recentlyVisited").style.display = "none";
            document.getElementById("showRecentlyVisitedCheckbox").checked = false;
        } else {
            document.getElementById("recentlyVisited").style.display = "flex";
            document.getElementById("showRecentlyVisitedCheckbox").checked = true;
        }
        if (!settings['showCurrentTime']) {
            document.getElementById("mainTime").style.display = "none";
            document.getElementById("showCurrentTimeCheckbox").checked = false;
        } else {
            document.getElementById("mainTime").style.display = "flex";
            document.getElementById("showCurrentTimeCheckbox").checked = true;
        }
        if (!settings['showQuote']) {
            document.getElementById("mainQuote").style.display = "none";
            document.getElementById("showQuoteCheckbox").checked = false;
            document.getElementById("quoteAuthor").innerHTML = "";
        } else {
            document.getElementById("mainQuote").style.display = "block";
            document.getElementById("showQuoteCheckbox").checked = true;
            document.getElementById("twitterEnabledSwitch").checked = settings['quote-from-twitter'];
            if (!hasBeenAdded){
                document.getElementById("twitterEnabledSwitch").addEventListener('click', function(){
                    updateToggleState(this);
                }, false);
                hasBeenAdded = true;                
            }
            document.getElementById("twitterHandleField").value = settings['twitter-handle'];
            if (settings['quote-from-twitter']){
                document.getElementById("quoteAuthor").innerHTML = "- @" + settings['twitter-handle'];
            }else{
                document.getElementById("quoteAuthor").innerHTML = "";
            }
        }
        if (!settings['showGreeting']) {
            document.getElementById("mainGreetingWrapper").style.display = "none";
            document.getElementById("showGreetingCheckbox").checked = false;
        } else {
            document.getElementById("mainGreetingWrapper").style.display = "flex";
            document.getElementById("mainGreetingWrapper").style.flexDirection = "column";
            document.getElementById("showGreetingCheckbox").checked = true;
        }
        if (!settings['enableQuicklaunch']) {
            document.getElementById("hotKeys").style.display = "none";
            document.getElementById("enableQuicklaunchCheckbox").checked = false;
            document.getElementById("quickLaunchSettingsTable").style.display = "none";

        } else {
            document.getElementById("hotKeys").style.display = "block";
            document.getElementById("quickLaunchSettingsTable").style.display = "table";
            document.getElementById("enableQuicklaunchCheckbox").checked = true;
            for (var i = 0; i < settings['launcher-items'].length; i++) {
                if (!document.getElementById(settings['launcher-items'][i].website)) {
                    var settingsItem = addChild("tr", settings['launcher-items'][i].website, document.getElementById("quickLaunchSettingsBody"), null);
                    addChild("td", settings['launcher-items'][i].website + "-name", settingsItem, settings['launcher-items'][i].website);
                    addChild("td", settings['launcher-items'][i].website + "-bind", settingsItem, settings['launcher-items'][i].bind);
                    var itemEnabled = addChild("td", settings['launcher-items'][i].website + "-enabled", settingsItem, null);
                    var enabledCheckbox = addCheckbox(itemEnabled, settings['launcher-items'][i].enabled, settings['launcher-items'][i].website + "-enabled-checkbox-" + i);
                    enabledCheckbox.addEventListener("click", function() {
                        changeSettingsEnabledState(this.id);
                    }, false);
                    var itemVisible = addChild("td", settings['launcher-items'][i].website + "-visible", settingsItem, null);
                    var visibleCheckbox = addCheckbox(itemVisible, settings['launcher-items'][i].visible, settings['launcher-items'][i].website + "-visible-checkbox-" + i);
                    visibleCheckbox.addEventListener("click", function() {
                        changeSettingsVisibleState(this.id);
                    }, false);
                }
                if (settings['launcher-items'][i].enabled) {
                    var settingsIcon = addChild("a", settings['launcher-items'][i].website + "-icon-" + i, document.getElementById("hotKeys"), settings['launcher-items'][i].icon);
                    settingsIcon.href = settings['launcher-items'][i].url;
                    if (settings['launcher-items'][i].visible) {
                        settingsIcon.style.display = "inline-block";
                    } else {
                        settingsIcon.style.display = "none";
                    }
                }
            }
        }
        if (!settings['showCurrentWeather']) {
            document.getElementById("currentWeather").style.display = "none";
            document.getElementById("showCurrentWeatherCheckbox").checked = false;
        } else {
            document.getElementById("currentWeather").style.display = "block";
            document.getElementById("showCurrentWeatherCheckbox").checked = true;
        }
        if (!settings['showNotePad']) {
            document.getElementById("toDoList").style.display = "none";
            document.getElementById("showNotePadCheckbox").checked = false;
        } else {
            document.getElementById("toDoList").style.display = "flex";
            document.getElementById("showNotePadCheckbox").checked = true;
            if (settings['current-note']) {
                document.getElementById("toDoList").value = settings['current-note'];
            }
        }
    };

    function updateToggleState(obj) {
        chrome.runtime.sendMessage({ requesttype: "updateSettings", setting: "quote-from-twitter", value: obj.checked });
    }

    function addChild(type, item_id, parent, contents) {
        if (item_id && document.getElementById(item_id)) {
            return document.getElementById(item_id);
        }
        var item = document.createElement(type);
        if (contents) {
            item.innerHTML = contents;
        }
        if (item_id) {
            item.id = item_id;
        }
        parent.appendChild(item);
        return item;
    }

    function addCheckbox(parent, checked, item_id) {
        if (item_id && document.getElementById(item_id)) {
            return document.getElementById(item_id);
        }
        var checkbox = document.createElement("input");
        if (item_id) {
            checkbox.id = item_id;
        }
        checkbox.type = "checkbox";
        checkbox.checked = checked;
        parent.appendChild(checkbox);
        return checkbox;
    }

    function changeSettingsEnabledState(id) {
        arr = id.split("-");
        index = arr[arr.length - 1];
        chrome.runtime.sendMessage({ requesttype: "updateSettings", setting: "launcher-items", index: index, attribute: "enabled", value: document.getElementById(id).checked });
    }

    function changeSettingsVisibleState(id) {
        arr = id.split("-");
        index = arr[arr.length - 1];
        chrome.runtime.sendMessage({ requesttype: "updateSettings", setting: "launcher-items", index: index, attribute: "visible", value: document.getElementById(id).checked });
    }

    return {
        applySettings: applySettings
    };
});
