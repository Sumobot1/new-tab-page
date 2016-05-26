define(function () {   
        function updateSites(currentSites) {
        	document.getElementById("recentlyVisited").innerHTML = "";
            for (var i = 0;i<currentSites.length;i++){
            	console.log("currentSites[i]: ", currentSites);
            	var historyItem = document.createElement("div");
            	historyItem.innerHTML = "<a href=\""+currentSites[i].url+"\" class=\"classyAnchor\">"+currentSites[i].title+"</a>";
            	historyItem.classList.add('recentlyVisitedItem');
            	document.getElementById("recentlyVisited").appendChild(historyItem);
            }
        };
     return {
     	updateSites: updateSites
    };
});