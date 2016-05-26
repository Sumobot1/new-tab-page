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
	for (var i = 0;i<results.length;i++){
		if (results[i].title === ""){
			console.log("Title is blank");
			results[i].title = this.fixTitle(results[i]);
		}
	}
	console.log("Final Results: ", results);
	background.sendMessage({requesttype: "updatedHistory", history: results});
};

chromehistory.isNumeric = function (value) {
    return /^\d+$/.test(value);
};

chromehistory.fixTitle = function(site){
	console.log("Need to fix title on this one ", site);
	console.log("site.url: ", site.url);
	var sURL = String(site.url);
	console.log("sURL1: ", sURL);
	var arCommonLeftOver = ["http", "https", "en", "ca", "utf", "rja", "rlz", "espv", "isch", "lnms"];
	var arCommonTwoLetter = ["of", "to", "in", "it", "is", "be", "as", "at", "so", "we", "he", "by", "or", "on", "do", "if", "me", "my", "up", "an", "go", "no", "us", "am"];
	sURL = sURL.replace(/http:\/\/|https:\/\/|.com|.org|.ca|.io|.io|.xyz|www./g, "");
	sURL = sURL.replace(/\%20|url\?|\&q\=|\&src\=|\&esrc\=|\&source\=|\%2F|\%3A|\&usg\=|\&url\=|\&rct\=|\&cad\=|\&cd\=|\&ved=|\#imgrc\=|\&rlz\=|\&biw\=|\&tbm\=|\&bih\=|\#imgdii\=|\&imgrc\=/g, "_")
	console.log("sURL2: ", sURL);
	console.log("sURL3: ", sURL);
	sURL = sURL.split(/[,\/#!$%\^&\*;:\"\'’{}.=\-_`?~+()“”¿]/g);	/*/\//g*/
	console.log("sURL4: ", sURL);
	var sSite = sURL.splice(0,1);
	sSite = String(sSite).replace(/(^|\s)[a-z]/g,function(f){return f.toUpperCase();});
	for (var i = 0;i<sURL.length;i++){
		if (sURL[i].length===0 || sURL[i].length === 1 && sURL[i].toLowerCase()!="i" && sURL[i].toLowerCase()!="a" || this.isNumeric(sURL[i].charAt(0)) || arCommonLeftOver.indexOf(sURL[i].toLowerCase())>-1 || sURL[i].length === 2 && arCommonTwoLetter.indexOf(sURL[i]) === -1){		/*this.isNumeric(sURL[i]) || */
			sURL.splice(i, 1);
			i--;
		}
		else if (sURL[i].substring(1, sURL[i].length-2).match(/[A-Z]/) || sURL[i].substring(1, sURL[i].length-2).match(/[0-9]/)){
			sURL.splice(i, 1);
			i--;
		}
			
	}
	console.log("sSite: ", sSite);
	console.log("sURL: ", sURL);
	var sFin = sSite+" - ";
	for (var i = 0;i<sURL.length;i++){
		sFin+=sURL[i]+" ";
	}
	return sFin;
};

chrome.history.onVisited.addListener(function(){chromehistory.getRecentlyVisited(5)});