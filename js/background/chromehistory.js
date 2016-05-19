var chromehistory = {
};

chromehistory.hello = function(){
	console.log("hello");
	return ("also goodbye");
};

chromehistory.getRecentlyVisited = function(num){
	chrome.history.search({text: '', maxResults: num}, this.updateHistory.bind(this));
};

chromehistory.updateHistory = function(results){
	console.log("results ", results);

}

chrome.history.onVisited.addListener(function(){chromehistory.getRecentlyVisited(5)});