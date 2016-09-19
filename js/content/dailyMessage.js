//http://www.icndb.com/api/

define(function() {
    // function showTweets() {
    //     console.log(req.response);
    //     req = JSON.parse(req.response);
    //     console.log(req.value.joke);
    //     document.getElementById("mainQuote").innerHTML = req.value.joke;

    //     //console.log(req.onload);
    //     console.log(req.value.joke);
    // }

    // var req;
    // function getQuote() {
    //     req = new XMLHttpRequest();
    //     //req.open('GET', 'https://crossorigin.me/http://twitter.com/simpleplan.json');     //xml respponse from twitter
    //     req.open('GET', 'http://api.icndb.com/jokes/random') //json
    //     req.onload = showTweets;
    //     req.send(null);
    // }
    function showQuote(theQuote){
    	document.getElementById("mainQuote").innerHTML = theQuote;
    }

    return {
        showQuote: showQuote
    };
});
