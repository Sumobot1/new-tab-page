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
	//return results;
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
	//var arWebString = ["http:\/\/", "https:\/\/", ".com", ".org", ".ca", ".io", ".xyz", "www."];
	//var arCommonURLSeparators = ["\%20", "url\?", "\&q\=", "\&src\=", "\&esrc\=", "\&source\=", "\%2F", "\%3A","\&usg\=", "\&url\=", "\&rct\=", "\&cd\=", "\&cad\="];
	var arCommonLeftOver = ["http", "https", "en", "ca", "utf", "rja", "rlz", "espv", "isch", "lnms"];
	var arCommonTwoLetter = ["of", "to", "in", "it", "is", "be", "as", "at", "so", "we", "he", "by", "or", "on", "do", "if", "me", "my", "up", "an", "go", "no", "us", "am"];
	//var arCommonThreeLetter = ["the", "and", "for", "are", "but", "not", "you", "all", "any", "can", "had", "her", "was", "one", "our", "out", "day", "get", "has", "him", "his", "how", "man", "new", "now", "old", "see", "two", "way", "who", "boy", "did", "its", "let", "put", "say", "she", "too", "use"];
	sURL = sURL.replace(/http:\/\/|https:\/\/|.com|.org|.ca|.io|.io|.xyz|www./g, "");
/*	for (var i = 0;i<arWebString.length;i++){
		if (sURL.indexOf(arWebString[i])>-1){
			sURL = sURL.replace(RegExp(arWebString[i], "g"), "_");
			console.log(arWebString[i]);
		}
		
		
	}*/
	sURL = sURL.replace(/\%20|url\?|\&q\=|\&src\=|\&esrc\=|\&source\=|\%2F|\%3A|\&usg\=|\&url\=|\&rct\=|\&cad\=|\&cd\=|\&ved=|\#imgrc\=|\&rlz\=|\&biw\=|\&tbm\=|\&bih\=|\#imgdii\=|\&imgrc\=/g, "_")
	console.log("sURL2: ", sURL);
	// for (var i = 0;i<arCommonURLSeparators.length;i++){
	// 	if (sURL.indexOf(arCommonURLSeparators[i])>-1){
	// 		console.log(arCommonURLSeparators[i]+" "+sURL.indexOf(arCommonURLSeparators[i]));
	// 		//sURL = sURL.replace(RegExp(arCommonURLSeparators[i], "g"), "-");
	// 		//console.log(arCommonURLSeparators[i]);
	// 	}

	// }
	// sURL = sURL.replace(/http:\/\//g, "");
	// sURL = sURL.replace(/https:\/\//g, "");
	// sURL = sURL.replace(/.com/g, "");
	// sURL = sURL.replace(/.org/g, "");
	// sURL = sURL.replace(/.ca/g, "");
	// sURL = sURL.replace(/.io/g,"");
	// sURL = sURL.replace(/.xyz/g, "");
	// sURL = sURL.replace(/www./g, "");
	console.log("sURL3: ", sURL);
	sURL = sURL.split(/[,\/#!$%\^&\*;:\"\'’{}.=\-_`?~+()“”¿]/g);	/*/\//g*/
	console.log("sURL4: ", sURL);
	var sSite = sURL.splice(0,1);
	sSite = String(sSite).replace(/(^|\s)[a-z]/g,function(f){return f.toUpperCase();});
	for (var i = 0;i<sURL.length;i++){
		//sURL[i] = sURL[i].replace(/[,\/#!$%\^&\*;:\"\'’{}=\-_`~()“”¿]/g, " ");
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

//https://www.google.ca/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0ahUKEwiKh879qPbMAhVXPVIKHZ9dCY0QFggcMAA&url=http%3A%2F%2Fstackoverflow.com%2Fquestions%2F3867460%2Fvalid-url-separators&usg=AFQjCNHHXZYpo3ACRDlk6zmZ-yVWJIETsQ&cad=rja
//https://www.google.ca/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0ahUKEwjb0o6HrfbMAhUGL1IKHZe5DoYQFggcMAA&url=https%3A%2F%2Fen.wiktionary.org%2Fwiki%2FCategory%3AEnglish_two-letter_words&usg=AFQjCNERHS6ibeE6NgZ_d8rGemJ1sOU3Pg&cad=rja
//https://www.google.ca/url?sa=t&rct=j&q=&esrc=s&source=web&cd=5&ved=0ahUKEwjal7C6sPbMAhUIDlIKHTZoC6oQFgg1MAQ&url=http%3A%2F%2Fwww.oxforddictionaries.com%2Fwords%2Ftwo-letter-words&usg=AFQjCNGroJvcQt54khJLORPdRUNko1zibA&cad=rja
//https://www.google.ca/url?sa=t&rct=j&q=&esrc=s&source=web&cd=2&ved=0ahUKEwjwuYbLt_bMAhVOc1IKHQHmD7IQFggiMAE&url=http%3A%2F%2Fstackoverflow.com%2Fquestions%2F3480771%2Fhow-do-i-check-if-string-contains-substring&usg=AFQjCNHyeDxQhcKe3aH86JH_5Wr3Ng9Dog&bvm=bv.122852650,d.aXo&cad=rja