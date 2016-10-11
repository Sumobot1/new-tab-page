//http://www.icndb.com/api/
var quote = {
    'quote': null,
    'tweet': null
};

quote.gotChuck = function(req) {
    req = JSON.parse(req);
    this.quote = req.value.joke;
    background.sendMessage({ requesttype: "gotQuote", quote: req.value.joke });
};

quote.getQuote = function() {
    console.log("GETQUOTE");
    if (!background.theUserSettings['showQuote']){
        return;
    }
    if (background.theUserSettings['quote-from-twitter'] && background.theUserSettings['twitter-handle'] && this.tweet) {
        background.sendMessage({requesttype: "gotQuote", quote: this.tweet});
    } else if (background.theUserSettings['quote-from-twitter'] && background.theUserSettings['twitter-handle']){
        this.getTheQuote();
    } else if (!background.theUserSettings['quote-from-twitter'] && this.quote){
        background.sendMessage({requesttype: "gotQuote", quote: this.quote});
    } else {
        this.getTheQuote();
    }
};

var req;
quote.getTheQuote = function() {
    console.log("getTheQuote");
    if (background.theUserSettings['quote-from-twitter']) {
        if (background.theUserSettings['twitter-handle']) {
            var url = 'https://crossorigin.me/http://twitter.com/' + background.theUserSettings['twitter-handle'] + '.json';
            this.httpGetAsync(url, this.gotTweets.bind(this));
        }else{
          this.httpGetAsync("http://api.icndb.com/jokes/random", this.gotChuck.bind(this));
        }
    } else {
        this.httpGetAsync("http://api.icndb.com/jokes/random", this.gotChuck.bind(this));
    }
};

quote.gotTweets = function(req) {
    parser=new DOMParser();
    htmlDoc=parser.parseFromString(req, "text/html");
    var twitterStream = htmlDoc.getElementById("stream-items-id").children;
    for (var i = 0;i<twitterStream.length;i++){
        if (!twitterStream[i].classList.contains("js-pinned")) {
            var twitter_handle = twitterStream[i].getElementsByClassName('content')[0].getElementsByClassName("username")[0].children;
            var handle = twitter_handle[0].innerHTML + twitter_handle[1].innerHTML;
            var tweet = twitterStream[i].getElementsByClassName("content")[0].getElementsByClassName("TweetTextSize")[0].innerHTML;
            this.tweet = tweet;
            background.sendMessage({requesttype: "gotQuote", quote: tweet, handle: handle});
            break;
        }
    }
};

quote.httpGetAsync = function(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
};
