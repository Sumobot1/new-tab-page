var chromehistory = {
	'recentlyVisited': null
};

chromehistory.hello = function(){
	return ("also goodbye");
};

chromehistory.getRecentlyVisited = function(){
	if (chromehistory.recentlyVisited) {
		background.sendMessage({requesttype: "updatedHistory", history: chromehistory.recentlyVisited});
	}else{
		chromehistory.getRecentlyVisitedSites(5);
	}
};

chromehistory.getRecentlyVisitedSites = function(num){
	chrome.history.search({text: '', maxResults: num}, this.updateHistory.bind(this));
};

chromehistory.updateHistory = function(results){
	for (var i = 0;i<results.length;i++){
		if (results[i].title === ""){
			results[i].title = this.fixTitle(results[i]);
		}
	}
	this.recentlyVisited = results;
	background.sendMessage({requesttype: "updatedHistory", history: results});
};

chromehistory.isNumeric = function (value) {
    return /^\d+$/.test(value);
};

chromehistory.fixTitle = function(site){
	var sURL = String(site.url);
	var arCommonLeftOver = ["http", "https", "en", "ca", "utf", "rja", "rlz", "espv", "isch", "lnms"];
	var arCommonTwoLetter = ["of", "to", "in", "it", "is", "be", "as", "at", "so", "we", "he", "by", "or", "on", "do", "if", "me", "my", "up", "an", "go", "no", "us", "am"];
	sURL = sURL.replace(/http:\/\/|https:\/\/|.com|.org|.ca|.io|.io|.xyz|www./g, "");
	sURL = sURL.replace(/\%20|url\?|\&q\=|\&src\=|\&esrc\=|\&source\=|\%2F|\%3A|\&usg\=|\&url\=|\&rct\=|\&cad\=|\&cd\=|\&ved=|\#imgrc\=|\&rlz\=|\&biw\=|\&tbm\=|\&bih\=|\#imgdii\=|\&imgrc\=/g, "_");
	sURL = sURL.split(/[,\/#!$%\^&\*;:\"\'’{}.=\-_`?~+()“”¿]/g);	
	var sSite = sURL.splice(0,1);
	sSite = String(sSite).replace(/(^|\s)[a-z]/g,function(f){return f.toUpperCase();});
	for (var i = 0;i<sURL.length;i++){
		if (sURL[i].length===0 || sURL[i].length === 1 && sURL[i].toLowerCase()!="i" && sURL[i].toLowerCase()!="a" || this.isNumeric(sURL[i].charAt(0)) || arCommonLeftOver.indexOf(sURL[i].toLowerCase())>-1 || sURL[i].length === 2 && arCommonTwoLetter.indexOf(sURL[i]) === -1){		/*this.isNumeric(sURL[i]) || */
			sURL.splice(i, 1);
			i--;
		} else if (sURL[i].substring(1, sURL[i].length-2).match(/[A-Z]/) || sURL[i].substring(1, sURL[i].length-2).match(/[0-9]/)){
			sURL.splice(i, 1);
			i--;
		}		
	}
	var sFin = sSite+" - ";
	for (var i = 0;i<sURL.length;i++){
		sFin+=sURL[i]+" ";
	}
	return sFin;
};

chrome.history.onVisited.addListener(function(){chromehistory.getRecentlyVisited(5)});