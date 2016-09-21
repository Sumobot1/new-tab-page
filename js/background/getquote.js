//http://www.icndb.com/api/
var quote = {

}

quote.gotChuck = function(req) {
    console.log(req);
        req = JSON.parse(req);
        console.log(req.value.joke);
        //document.getElementById("mainQuote").innerHTML = req.value.joke;

        //console.log(req.onload);
        console.log(req.value.joke);
        background.sendMessage({requesttype: "gotQuote", quote: req.value.joke});
    }

    var req;
quote.getQuote = function() {
       // req = new XMLHttpRequest();
        //req.open('GET', 'https://crossorigin.me/http://twitter.com/simpleplan.json');     //xml respponse from twitter
        //if/else here
      //  req.open('GET', 'http://api.icndb.com/jokes/random') //json
       // req.onload = getQuote;
      //  req.send(null);
      this.httpGetAsync("http://api.icndb.com/jokes/random", this.gotChuck.bind(this));
    }

quote.gotTweets = function(){

}

quote.httpGetAsync = function(theUrl, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}