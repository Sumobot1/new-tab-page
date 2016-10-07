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
    background.sendMessage({ requesttype: "gotQuote", quote: req.value.joke });
}

var req;
quote.getQuote = function() {
    console.log(background.theUserSettings['quote-from-twitter']);
    if (background.theUserSettings['quote-from-twitter']) {
        //req = new XMLHttpRequest();
        if (background.theUserSettings['twitter-handle']) {
            console.log(background.theUserSettings['twitter-handle']);
            var url = 'https://crossorigin.me/http://twitter.com/' + background.theUserSettings['twitter-handle'] + '.json';
            console.log(url);
            this.httpGetAsync(url, this.gotTweets.bind(this));
        }else{
          this.httpGetAsync("http://api.icndb.com/jokes/random", this.gotChuck.bind(this));
        }
        // req.open('GET', 'https://crossorigin.me/http://twitter.com/simpleplan.json');     //xml respponse from twitter
    } else {
        this.httpGetAsync("http://api.icndb.com/jokes/random", this.gotChuck.bind(this));
    }
    // req = new XMLHttpRequest();
    //req.open('GET', 'https://crossorigin.me/http://twitter.com/simpleplan.json');     //xml respponse from twitter
    //if/else here
    //  req.open('GET', 'http://api.icndb.com/jokes/random') //json
    // req.onload = getQuote;
    //  req.send(null);

}

quote.gotTweets = function(req) {
    parser=new DOMParser();
    htmlDoc=parser.parseFromString(req, "text/html");
    console.log("done");
    console.log(htmlDoc.getElementById("stream-items-id"));
    var twitterStream = htmlDoc.getElementById("stream-items-id").children;
    for (var i = 0;i<twitterStream.length;i++){
        console.log(twitterStream[i].getElementsByClassName('context')[0].getElementsByClassName("js-pinned-text")[0]);
        if (!twitterStream[i].classList.contains("js-pinned")) {
            var twitter_handle = twitterStream[i].getElementsByClassName('content')[0].getElementsByClassName("username")[0].children;
            var handle = twitter_handle[0].innerHTML + twitter_handle[1].innerHTML;
            var tweet = twitterStream[i].getElementsByClassName("content")[0].getElementsByClassName("TweetTextSize")[0].innerHTML;
            background.sendMessage({requesttype: "gotQuote", quote: tweet, handle: handle});
            break;
        }
    }
}

quote.httpGetAsync = function(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
